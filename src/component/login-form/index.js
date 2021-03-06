import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import purple from 'material-ui/colors/purple';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send'
import { CircularProgress } from 'material-ui/Progress';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    inputLabelFocused: {
        fontSize: '24px',
        color: `#42d1a8`,
    },
    inputInkbar: {
        '&:after': {
            backgroundColor: `#42d1a8`,
        },
    },
    textFieldRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    textFieldInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 24,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    textFieldFormLabel: {
        fontSize: 24,
    },
});

class CustomizedInputs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: false,
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
    }
    handleInputChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    };


    handleSubmit(e) {
        e.preventDefault()
        this.setState({ loading: true })
        this.props.onComplete(this.state)
            .then(() => {
                {
                    this.props.userFetchRequest ? this.props.userFetchRequest().then(() => {
                        this.setState({ loading: false })
                        window.location.href = '/home'

                    }) : window.location.href = '/'
                }
            })
            .catch(error => {
                console.error(error);
                this.setState({ error, loading: false });
            });


    }


    render() {
        const { classes } = this.props;


        return (


            <div >
                {/* <h1 className="land-head">Kritter</h1> */}
                {/* <h2 className="login-link">Login</h2> */}
                <FormControl >
                    <InputLabel
                        style={{ fontSize: '16px' }}
                        FormControlClasses={{
                            focused: classes.inputLabelFocused,
                        }}
                        htmlFor="Username"
                    >
                        Username
            </InputLabel>
                    <Input
                        // style={{ fontSize: '24px' }}
                        onChange={this.handleInputChange('username')}
                        error={this.state.errors}
                        value={this.state.username}
                        classes={{
                            inkbar: classes.inputInkbar,
                        }}
                        id="Username"
                    />

                </FormControl>

                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel
                        style={{ fontSize: '16px' }}
                        FormControlClasses={{
                            focused: classes.inputLabelFocused,
                        }}
                        htmlFor="Password"
                    >
                        Password
            </InputLabel>
                    <Input
                        // style={{ fontSize: '18px' }}
                        type="password"

                        onChange={this.handleInputChange('password')}
                        error={this.state.errors}
                        value={this.state.password}
                        classes={{
                            inkbar: classes.inputInkbar,
                        }}
                        id="Password"
                    />
                </FormControl>
                <br />

                <Button onClick={this.handleSubmit} raised style={{ backgroundColor: `#42d1a8`, color: `#FAFAFA` }}>
                    <SendIcon />
                </Button>
                <br />
                {this.state.loading ? <CircularProgress style={{ color: purple[500] }} thickness={7} /> : undefined}
                {this.state.error ? <p style={{ color: 'red' }}>Whoops, make sure your username and password are correct</p> : undefined}

            </div>

        );
    }
}

CustomizedInputs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputs);