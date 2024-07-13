import React, { useState } from "react";
import api from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "../ImageGallery";
import { baseUrl } from "../../utils/service";
import { FaPlus } from "react-icons/fa";
import PostImageModal from "../Modal/AlbumModal/PostImageModal";
import { setUserInformation, userInfor } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { LuEye } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Album = ({ player, id }) => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const userInfo = useSelector(userInfor);
  const dispatch = useDispatch();

  const handleCreateShow = () => {
    setShowCreate(true);
  };

  const handleCreateClose = () => {
    setShowCreate(false);
  };

  const handleDeleteImage = async () => {
    try {
      const user = await api.put(`http://localhost:3008/api/user/delete-image`, {
        image: imageToDelete,
      });
      dispatch(setUserInformation(user.data));
      toast.success("Xóa thành công");
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error, "Xóa thất bại");
    }
  };

  const openDeleteModal = (image) => {
    setImageToDelete(image);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const previousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? player.player.images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === player.player.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container">
      {uploadStatus && <p className="text-center mt-4">{uploadStatus}</p>}
      <div className="d-flex p-40 flex-wrap">
        {userInfo?._id === id && (
          <div
            onClick={handleCreateShow}
            className="flex items-center justify-center bg-gray-200 border-2 border-dashed border-gray-400 text-gray-500 cursor-pointer rounded-lg mb-4 mr-20"
            style={{
              width: "200px",
              height: "250px",
              borderRadius: "15px",
              fontSize: "30px",
            }}
          >
            <FaPlus />
          </div>
        )}
        {player?.player?.images?.map((i, index) => {
          let converted_path = i.replaceAll("\\", "/");
          const url = baseUrl + converted_path;
          return (
            <div
              key={index}
              className="image-item mr-20 mb-20"
              style={{
                backgroundImage: `url(${url})`,
                width: "200px",
                height: "250px",
                borderRadius: "15px",
                backgroundSize: "cover",
              }}
            >
              <div className="image-item-action d-flex justify-content-center align-items-center">
                <LuEye
                  style={{ fontSize: "30px" }}
                  onClick={() => {
                    openModal(index);
                  }}
                />
                {userInfo?._id === id && (
                  <MdDeleteOutline
                    style={{ fontSize: "30px" }}
                    onClick={() => openDeleteModal(i)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ImageGallery
        image={player.player?.images[currentImageIndex]}
        isOpen={isOpen}
        closeModal={closeModal}
        previousImage={previousImage}
        nextImage={nextImage}
      />
      <PostImageModal
        show={showCreate}
        close={handleCreateClose}
        setImages={setImages}
        images={images}
        setShowCreate={setShowCreate}
      />
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Xác nhận xóa ảnh</h3>
            <p className="mb-4">Bạn có chắc chắn muốn xóa ảnh này không?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDeleteImage}
                className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
              >
                Xóa
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;
