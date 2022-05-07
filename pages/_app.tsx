import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import reduxStore from "../src/store";
import App from "next/app";
import {createWrapper} from "next-redux-wrapper";

class MyApp extends App {
    render() {
        const {Component, pageProps}: AppProps = this.props
        return (
            <Provider store={reduxStore}>
                <Component {...pageProps}/>
            </Provider>
        )
    }
}

const makeStore = () =>  reduxStore;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
