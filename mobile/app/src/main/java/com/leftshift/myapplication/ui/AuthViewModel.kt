package com.leftshift.myapplication.ui

import android.app.Application
import android.icu.lang.UScript
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.leftshift.myapplication.datamodel.User
import com.leftshift.myapplication.datamodel.UserSchema
import com.leftshift.myapplication.repositories.AuthRepository
import com.leftshift.myapplication.session.Session
import kotlinx.coroutines.launch

class AuthViewModel(
    private val app: Application
): AndroidViewModel(app) {

    private val authRepository = AuthRepository(app.applicationContext)
    private val session = Session.getInstance(app.applicationContext)

    fun createSession(name: String, email: String, id: Int){
        session.createSession(
            email, name, id
        )
    }

    fun isLogin(): Boolean = session.isLogin()

    fun logOut(){
        session.logOut()
    }

    fun loginUser(email: String, password: String, callback: (UserSchema?, String?)->Unit){
        viewModelScope.launch {
            authRepository.login(email, password, callback)
        }
    }

    fun registerUser(user: User, callback: (UserSchema?, String?)-> Unit){
        viewModelScope.launch {
            authRepository.register(user, callback)
        }
    }
}