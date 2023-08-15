import { Fragment, useState } from "react";

const LoginModal = () => {
    const [player, setPlayer] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            [name]: value,
        }));
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const body = player;
            console.log(body);
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <div className="modal-dialaog">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-2">Login</h1>
                    </div>
                    <div className="modal-body p-5 pt-0">
                        <form className="" onSubmit={handleLogin}>
                            <div className="form-floating mb-3">
                                <input id="floatingUsername" type="text" name="username" className="form-control" value={player.username} onChange={handleChange}></input>
                                <label htmlFor='floatingUserName'>Username</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input id='floatingPassword' type='password' name='password' className='form-control' value={player.password} onChange={handleChange}></input>
                                <label htmlFor='floatingPassword'>Password</label>
                            </div>
                            <button className="btn btn-success">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginModal;