import React from 'react'

export default function Form({loggedInStatus,handleSubmit,username,handleInput,password, matchData, handleLogOut}) {
    if (!loggedInStatus) {
        return (
            <div className='login'>
                <form onSubmit={handleSubmit} className='loginForm'>
                    <input 
                        name="username"
                        className="" 
                        value={username} 
                        placeholder="username" 
                        type="text" 
                        onChange={handleInput}
                        />
                    <input 
                        name="password"
                        className="" 
                        value={password} 
                        placeholder="password" 
                        type="text" 
                        onChange={handleInput}
                    />
                    <button type="submit"> Sign In </button>
                </form>
                <p>{matchData ? "" : "Invalid Username/Password"}</p>
            </div>
        )
    }
    return (
        <div className="loginInformation">
            <form onSubmit={handleLogOut} className="loggedInForm" >
                <h1>Welcome: {localStorage.username}</h1>
                <button type="submit">  Logout </button>
            </form>
        </div>
    )
}
  

