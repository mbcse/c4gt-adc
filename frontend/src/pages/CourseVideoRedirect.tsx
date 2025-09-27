import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { videoAPI } from "../services/api";

export default function CourseVideoRedirect() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function redirectToFirstVideo() {
      if (!courseId) return;
      const videos = await videoAPI.getCourseVideos(Number(courseId));
      if (videos.length > 0) {
        navigate(`/courses/${courseId}/video/${videos[0].id}`, { replace: true });
      } else {
        // no videos, handle appropriately, e.g. navigate back or show message
        navigate(`/courses/${courseId}`);
      }
    }
    redirectToFirstVideo();
  }, [courseId, navigate]);

  return <div>Loading...</div>;
}
