import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Result from "@/pages/Result";
import Rules from "@/pages/Rules";
import { incrementInviteCount } from '@/utils/storage';

// 检测分享链接参数，记录邀请计数
function ShareTracker() {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('share')) {
      incrementInviteCount();
    }
  }, [location.search]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ShareTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}
