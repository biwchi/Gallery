import "@/assets/css/index.css";

import ReactDOM from "react-dom/client";
import App from "@/App";
import MediaViewer from "@/components/MediaViewer/MediaViewer";
import store from "@/store/index.ts";

import { Provider } from "react-redux";
import AudioPlayer from './components/AudioPlayer/AudioPlayer';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AudioPlayer/>
    <MediaViewer />
    <App />
  </Provider>,
);
