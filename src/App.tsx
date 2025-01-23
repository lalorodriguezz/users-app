import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserTable from "./components/ui/UserTable";
import UserDetails from "./components/ui/UserDetails";
import PostComments from "./components/ui/PostComments";
import AlbumPhotos from "./components/ui/AlbumPhotos";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/posts/:postId" element={<PostComments />} />
        <Route path="/albums/:albumId" element={<AlbumPhotos />} />
      </Routes>
    </Router>
  );
};

export default App;
