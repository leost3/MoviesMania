import React from 'react'

export default function Form({loggedInStatus,handleSubmit,username,handleUsernameInput,password,handlePasswordInput,matchData, handleLogOut}) {
    if (!loggedInStatus) {
        return (
            <div className='login'>
                <form onSubmit={handleSubmit} className='loginForm'>
                    <input 
                        className="" 
                        value={username} 
                        placeholder="username" 
                        type="text" 
                        onChange={handleUsernameInput}
                    />
                    <input 
                        className="" 
                        value={password} 
                        placeholder="password" 
                        type="text" 
                        onChange={handlePasswordInput}
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
  

