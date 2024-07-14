import React, { useEffect, useState } from "react";
import ListIdol from "../layouts/ListIdol";
import NavBar from "../layouts/NavBar";
import ListStoryPage from "../components/ListStoryPage";
import StoryModal from "../components/Modal/StoryModal";
import api from "../utils/axiosConfig";
import { Spin } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function StoryPage() {
  const [stories, setStories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStory, setCurrentStory] = useState(null);
  const [openModalStory, setOpenModalStory] = useState(false);
  const { storyId, commentId } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    getListStories();
  }, []);

  useEffect(() => {
    console.log("change story");
    if (stories && storyId) {
      let index = null;
      for (let i = 0; i < stories.length; i++) {
        if (stories[i]._id === storyId) {
          index = i;
          break;
        }
      }
      if (index !== null) setCurrentStory(index);
    }
  }, [stories, storyId]);


  useEffect(() => {
    if (currentStory !== null && !openModalStory) {
      setOpenModalStory(true);
    }
  }, [currentStory]);

  useEffect(() => {
    if (!openModalStory) {
      setCurrentStory(null);
    }
  }, [openModalStory]);


  const getListStories = async () => {
    try {
      const response = await fetch("http://localhost:3008/api/stories");
      const data = await response.json();
      setStories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stories:", error);
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     // <Spin
  //     //   spinning={loading}
  //     //   className="d-flex justify-content-center align-content-center h-100"
  //     // ></Spin>
  //     <LoadingSpinner />
  //   );
  // }

  const handleViewStory = async () => {
    try {
      const res = await api.post(
        "/api/stories/viewStory/" + stories[currentStory]?._id
      );
      if (res?.isError) return;
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <div className="container-fluid d-flex flex-column vh-100 overflow-x-hidden bg-bgMain">
      <div
        className="row sticky-top bg-white shadow-sm"
        style={{ zIndex: "1" }}
      >
        <div className="col-12">
          <NavBar />
        </div>
      </div>
      <div className="row flex-grow-1">
        <div className="col-2 p-0">
          <div className="sticky-top" style={{ top: "4rem" }}>
            <ListIdol stories={stories} setStory={setStories} />
          </div>
        </div>
        <div className="col-10" style={{ backgroundColor: "#13131a" }}>
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-10 py-3">
              {loading && <LoadingSpinner />}
              <ListStoryPage
                stories={stories}
                setOpenModalStory={setOpenModalStory}
                setCurrentStory={setCurrentStory}
                handleViewStory={handleViewStory}
              />
            </div>
          </div>
        </div>
      </div>

      {!!openModalStory && (
        <StoryModal
          open={stories[currentStory]}
          onCancel={() => {setOpenModalStory(undefined); nav("/play-together/stories")}}
          setCurrentStory={setCurrentStory}
          stories={stories}
          onViewStory={handleViewStory}
          onOk={getListStories}
          commentId={commentId}
        // story={stories[currentStory]}
        // onOk={getList}
        />
      )}
    </div>
  );
}
