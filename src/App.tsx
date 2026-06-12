import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Result from "@/pages/Result";
import Rules from "@/pages/Rules";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}
