import "../styles/globals.css";
import  store  from "./store";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500&display=swap');
              body {
                margin: 0;
                font-family: 'Plus Jakarta Sans';
              }
            `}</style>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;