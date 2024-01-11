package com.leftshift.myapplication.repositories

import android.content.Context
import com.leftshift.myapplication.api.RetrofitInstance
import com.leftshift.myapplication.datamodel.User
import com.leftshift.myapplication.datamodel.UserResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AuthRepository(private val context: Context){

    private val retrofit = RetrofitInstance
    fun login(email: String, password: String, callback: (User?, String?)-> Unit){
        val call = retrofit.authApi.login(email, password)

        call.enqueue(object: Callback<UserResponse> {
            override fun onResponse(call: Call<UserResponse>, response: Response<UserResponse>) {
                if(response.isSuccessful){
                    response.body()?.let{
                        callback(it.user[0], it.message)
                    }
                }
                else{
                    response.body()?.let{
                        callback(null, it.message)
                    }
                }
            }

            override fun onFailure(call: Call<UserResponse>, t: Throwable) {
                callback(null, "Something went wrong")
            }

        })
    }

    fun register(email: String, password: String, confirmPassword: String, name: String, callback: (User?, String?)-> Unit){
        val call = retrofit.authApi.register(email, password, confirmPassword, name)

        call.enqueue(object: Callback<UserResponse> {
            override fun onResponse(call: Call<UserResponse>, response: Response<UserResponse>) {
                if(response.isSuccessful){
                    response.body()?.let{
                        callback(it.user[0], it.message)
                    }
                }
                else{
                    response.body()?.let{
                        callback(null, it.message)
                    }
                }
            }

            override fun onFailure(call: Call<UserResponse>, t: Throwable) {
                callback(null, "Something went wrong")
            }

        })
    }

}