import {useEffect} from "react";
import {useNavigation} from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import {useIsMutating} from "@tanstack/react-query";

NProgress.configure({
    showSpinner: false,
    minimum: 0.1,
    speed: 50,
    trickle: true,
    trickleSpeed: 50,
});
export default function ProgressBar() {
    const navigation = useNavigation();
    const mutations = useIsMutating();

    const isManualLoading = useSelector(
        (state: RootState) => state.ui.isLoading
    );

    const isLoading =
        navigation.state !== "idle" ||
        mutations > 0 ||
        isManualLoading;

    useEffect(() => {
        if (isLoading) {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [isLoading]);



    return null;
}