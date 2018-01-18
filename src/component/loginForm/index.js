import React from 'react'

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import SendIcon from 'material-ui-icons/Send'
import green from 'material-ui/colors/green';

export default class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
            isSubmitting: false,
            buttonState: 'Send Message',
            username: '',
            password: '',
            errors: false,
            usernameError: '',
            passwordError: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    componentDidMount() {

    }




    handleInputChange(e, name) {
        // let { value } = e.target;
        this.setState({
            [name]: e.target.value,
            // usernameError: name === 'username' && !value ? 'username must have a value' : null,

            // passwordError: name === 'password' && !value ? 'password must have a value' : null,
        });
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onComplete(this.state)


    }
    render() {


        return (
            <section id="cardBackground" className="contact container uppy small">


                <form id="form" noValidate autoComplete="on">
                    <TextField
                        id="username"
                        label="Username"
                        placeholder="Shaggy"
                        error={this.state.errors}
                        margin="normal"
                        onChange={() => this.handleInputChange('username')}
                        value={this.state.username}
                    />
                    <br />
                    <TextField
                        id="password"
                        label="Password"
                        placeholder="scoobysn@cks"
                        onChange={() => this.handleInputChange('password')}
                        margin="normal"
                        error={this.state.errors}
                        value={this.state.password}
                    />

                    <br />
                    {this.state.errors ? <h1>Whoops! Lets fill out all the options...</h1> : undefined}
                    {this.state.submitted ? <h1>Thanks! I'll be in touch with you soon!</h1> : undefined}
                    <Button onClick={this.handleSubmit} raised style={{ backgroundColor: `#42d1a8`, color: `#FAFAFA` }}>
                        <SendIcon />
                    </Button>

                </form>
            </section>
        )
    }
}


