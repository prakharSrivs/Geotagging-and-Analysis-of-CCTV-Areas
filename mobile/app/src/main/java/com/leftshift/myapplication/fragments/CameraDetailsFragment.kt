package com.leftshift.myapplication.fragments

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.leftshift.myapplication.R
import com.leftshift.myapplication.databinding.FragmentCameraDetailsBinding
import com.leftshift.myapplication.datamodel.Camera

class CameraDetailsFragment : Fragment() {

    private var _binding: FragmentCameraDetailsBinding? = null
    private val binding get() = _binding!!
    private lateinit var cameraItem: Camera
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let{
            cameraItem = it.getParcelable("cameraItem")!!
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentCameraDetailsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.cameraRtspCard.copyIv.setOnClickListener {
            copyRTSP()
        }
        updateUI()
        binding.cancelBtn.setOnClickListener {
            findNavController().popBackStack()
        }
        binding.deleteBtn.setOnClickListener{
            deleteCamera()
        }
        binding.editBtn.setOnClickListener {
            startEdit()
        }
    }

    private fun startEdit() {
        TODO("Not yet implemented")
    }

    private fun deleteCamera() {
        //TODO
    }

    private fun copyRTSP() {
        val clipBoardManager = requireContext().getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        val clip = ClipData.newPlainText("label", cameraItem.RTSP_Link)
        clipBoardManager.setPrimaryClip(clip)
        showToast("RTSP link copied")
    }

    private fun showToast(message: String){
        Toast.makeText(requireContext(), message, Toast.LENGTH_SHORT).show()
    }

    private fun updateUI(){
        binding.apply {
            cameraIdTv.text = cameraItem.cam_id.toString()
            cameraNameTv.text = cameraItem.cameraName
            cameraRtspCard.headingTv.text = "RTSP Link"
            cameraRtspCard.contentTv.text = cameraItem.RTSP_Link
            cameraDirectionCard.headingTv.text = "Direction"
            cameraDirectionCard.contentTv.text = cameraItem.pov_direction
            cameraResolutionCard.headingTv.text = "Resolution"
            cameraResolutionCard.contentTv.text = cameraItem.resolution
            cameraLatitudeCard.headingTv.text = "Latitude"
            cameraLongitudeCard.headingTv.text = "Longitude"
            cameraLongitudeCard.contentTv.text = cameraItem.longitude
            cameraLatitudeCard.contentTv.text = cameraItem.latitude
        }
    }
}