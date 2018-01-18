import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { Link, NavLink } from 'react-router-dom'
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PopupDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }

    componentDidMount() {
        console.log('popup mounted', this.props)
        { this.props.user.avatar === "" ? this.handleClickOpen() : undefined }
    }

    handleClickOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                {/* <Button onClick={this.handleClickOpen}>Slide in alert dialog</Button> */}
                <Dialog
                    open={this.state.open}
                    transition={Transition}
                    keepMounted
                    onClose={this.handleClose}

                >
                    <DialogContent style={{ fontSize: '48' }}>
                        Hello, {this.props.user.username}!
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '24' }}>
                            Thanks for joing the community, to get the best experience possible please go update your profile!
            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to={'/settings'}><Button onClick={this.handleClose} style={{ color: `#42d1a8`, fontSize: '18' }}>
                            I would love too!
                        </Button></Link>
                        <Button onClick={this.handleClose} style={{ color: `#42d1a8`, fontSize: '12' }}>
                            I'm camera shy...
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default PopupDialog;