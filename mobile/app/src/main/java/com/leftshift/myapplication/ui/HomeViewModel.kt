package com.leftshift.myapplication.ui

import android.app.Application
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.leftshift.myapplication.api.RetrofitInstance
import com.leftshift.myapplication.datamodel.Camera
import com.leftshift.myapplication.datamodel.CameraBodyPost
import com.leftshift.myapplication.datamodel.CameraListResponse
import com.leftshift.myapplication.datamodel.DefaultResponse

import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeViewModel(
    private val app: Application
): AndroidViewModel(app) {
    private var cameraListLiveData = MutableLiveData<List<Camera>?>()
    private var responseMessage = MutableLiveData<String>()


    fun get():LiveData<List<Camera>?>{
        return cameraListLiveData
    }
    fun getMessage():LiveData<String>{
        return responseMessage
    }


    private val camRetrofit = RetrofitInstance.camApi


    fun addCamera( cam:CameraBodyPost){
        val call =camRetrofit.addCamera(cam)
        call.enqueue(object: Callback<DefaultResponse>{
            override fun onResponse(
                call: Call<DefaultResponse>,
                response: Response<DefaultResponse>
            ) {
                    val data = response.body()
                    data?.let {
                        Toast.makeText(app.applicationContext,it.message,Toast.LENGTH_SHORT).show()
                    }

            }
            override fun onFailure(call: Call<DefaultResponse>, t: Throwable) {
                Toast.makeText(app.applicationContext,"Internal Server Error, Please try again",Toast.LENGTH_SHORT).show()
            }
        })
    }

    fun getCameras(uid:Int){
        val call = camRetrofit.getUserCamera(uid)
        call.enqueue(object:Callback<CameraListResponse>{
            override fun onResponse(
                call: Call<CameraListResponse>,
                response: Response<CameraListResponse>
            ) {
                if(response.isSuccessful){
                    val camList= response.body()?.camera
                    cameraListLiveData.value = camList
                }
            }
            override fun onFailure(call: Call<CameraListResponse>, t: Throwable) {
                Toast.makeText(app.applicationContext,"Internal Server Error, Please try again",Toast.LENGTH_SHORT).show()
            }

        })
    }
}