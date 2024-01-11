package com.leftshift.myapplication.api

import com.leftshift.myapplication.datamodel.UserResponse
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query

interface AuthAPI {

    @GET("/register")
    fun register(
        @Query("email") email: String,
        @Query("password") password: String,
        @Query("confirmPassword") confirmPassword: String,
        @Query("name") name: String
    ): Call<UserResponse>

    @GET("/login")
    fun login(
        @Query("email") email: String,
        @Query("password") password: String
    ): Call<UserResponse>
}