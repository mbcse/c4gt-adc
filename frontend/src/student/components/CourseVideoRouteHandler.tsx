
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { videoAPI } from "@/api/videoAPI";

export default function CourseVideoRouteHandler() {
  const { courseId } = useParams();
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
  
    videoAPI.getCourseVideos(Number(courseId), 1, 1).then((response) => {
      if (response.videos.length > 0) {
        setTarget(`/courses/${courseId}/video/${response.videos[0].id}`);
      } else {
        setTarget(`/courses/${courseId}`);
      }
    });
  }, [courseId]);
  

  if (target) return <Navigate to={target} replace />;
  return null;
}
