import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/green';


export default class PopupDialogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            username: '',
            password: '',
            email: '',
            bio: '',
            avatar: '',
            species: '',
            usernameError: null,
            passwordError: null,
            emailError: null,
            error: null,
            loading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        { this.props.openNow === 'instantLogin' ? this.handleClickOpen() : undefined }
    }

    handleClickOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({
            [name]: value,
            usernameError: name === 'username' && !value ? 'username must have a value' : null,
            emailError: name === 'email' && !value ? 'email must have a value' : null,
            passwordError: name === 'password' && !value ? 'password must have a value' : null,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true })
        this.props.onComplete(this.state)
            .then(() => {
                {
                    this.props.userFetchRequest ? this.props.userFetchRequest().then(() => {
                        this.setState({ loading: false })
                        window.location.href = '/home'

                    }) : undefined
                }
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    render() {
        return (
            <div>
                {this.state.loading ? <CircularProgress style={{ color: purple[500] }} thickness={7} /> : undefined}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle style={{ fontSize: 42 }}>Please {this.props.buttonText}</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send
                        updates occationally.
                        </DialogContentText> */}
                        <TextField
                            autoComplete="on"
                            style={{ underline: purple[500] }}
                            autoFocus
                            margin="dense"
                            id="username"
                            name="username"
                            label="Username"
                            type="username"
                            fullWidth
                            onChange={this.handleChange('username')}
                            value={this.state.username}
                        />

                        <TextField
                            autoComplete="on"
                            style={{ underline: purple[500] }}
                            autoFocus
                            name="password"
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={this.handleChange('password')}
                            value={this.state.password}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">
                            Login
                        </Button>

                        {this.props.openNow === 'instantLogin' ?
                            <Link to={'/'}><Button onClick={this.handleClose} color="primary">
                                Whoops, I need to Sign Up
                        </Button></Link>
                            : undefined}
                        <Button onClick={this.handleClose} color="primary">
                            Forgot Password?
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}