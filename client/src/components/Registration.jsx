import React, { Fragment, useState } from 'react';

const Registration = () => {
    const [player, setPlayer] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          [name]: value,
        }));
      };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = player;
            console.log(body);
            const response = await fetch("http://localhost:8000/api/addPlayer", { //TODO: Rename to "/api/addPlayer" in production build
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <div className='modal-dialog'>
                <div className='modal-content rounded-4 shadow'>
                    <div className='modal-header p-5 pb-4 border-bottom-0'>
                        <h1 className='fw-bold mb-0 fs-2'>Register</h1>
                        <button className='btn-close' type='button' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body p-5 pt-0'>
                        <form className='' onSubmit={handleSubmitForm}>
                            <div className='form-floating mb-3'>
                                <input id='floatingUsername' type='text' name='username' className='form-control' value={player.username} onChange={handleChange}></input>
                                <label htmlFor='floatingUserName'>Username</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input id='floatingEmail' type='email' name='email' className='form-control' value={player.email} onChange={handleChange}></input>
                                <label htmlFor='floatingEmail'>Email Address</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input id='floatingPassword' type='password' name='password' className='form-control' value={player.password} onChange={handleChange}></input>
                                <label htmlFor='floatingPassword'>Password</label>
                            </div>
                            <button className='btn btn-success'>register</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );

};

export default Registration;