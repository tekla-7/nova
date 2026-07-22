import {useRevalidator, useRouteLoaderData} from "react-router-dom";
import type {NotificationPreferences, User} from "../../../types/user.ts";
import {useState} from "react";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {editNotification} from "../../../utils/http.ts";
import {uiAction as notificationAction} from "../../../store/ui-slice.tsx";

export default function Notifications() {
    const user = useRouteLoaderData("profile") as User;
    const [notifications, setNotifications] = useState<NotificationPreferences>(user.notificationPreferences);
    const dispatch = useDispatch();
    const {revalidate} = useRevalidator();
    function changeNotifications(name: keyof NotificationPreferences) {
        setNotifications((old) => ({
            ...old,
            [name]: !old[name],
        }));
    }
    function onSave(){
        const isSame = Object.keys(notifications).every(
            (key) =>
                notifications[key as keyof NotificationPreferences] ===
                user.notificationPreferences[key as keyof NotificationPreferences]
        );

        if (isSame) {
            dispatch(
                notificationAction.showNotification({
                    status: "info",
                    title: "Information",
                    message: "Nothing is changed. Please change value and try again",
                })
            );
            return;
        }
        mutate(notifications)
    }
    const {mutate} = useMutation({
        mutationFn: editNotification,
        onSuccess: () => {
            revalidate().then(() => console.log('Successfully updated'));
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Notification was changed successfully',
            }))
        },
        onError: (error) => {
            dispatch(notificationAction.showNotification({
                status: 'error',
                title: 'Error',
                message: error.message,
            }))
        }
    });
    return <>
        <h1 className='text-base font-medium mb-4'>Notification preferences</h1>
        <div>
            <div className='flex items-center justify-between py-3 border-b border-[#0b0b0b]/10'>
                <div>
                    <h2 className='text-[13px] font-medium mb-0.5'>Order updates</h2>
                    <p className='text-[11px] text-[#898781]'>Shipping, delivery, and status changes</p>
                </div>
                <button
                    onClick={() => changeNotifications("orderUpdates")}
                    className={clsx(
                        "relative h-5 w-9 rounded-full cursor-pointer transition-all duration-200",
                        notifications.orderUpdates
                            ? "bg-[#0b0b0b]"
                            : "bg-[#0b0b0b]/40"
                    )}
                >
                    <div
                        className={clsx(
                            "absolute left-[3px] top-[3px] h-[14px] w-[14px] rounded-full bg-white transition-transform duration-200 ease-in-out",
                            notifications.orderUpdates && "translate-x-4"
                        )}
                    />
                </button>
            </div>
            <div className='flex items-center justify-between py-3 border-b border-[#0b0b0b]/10'>
                <div>
                    <h2 className='text-[13px] font-medium mb-0.5'>Promotions and sales</h2>
                    <p className='text-[11px] text-[#898781]'>Flash sales, discount codes, seasonal offers</p>
                </div>
                <button
                    onClick={() => changeNotifications("promotions")}
                    className={clsx(
                        "relative h-5 w-9 rounded-full cursor-pointer transition-all duration-200",
                        notifications.promotions
                            ? "bg-[#0b0b0b]"
                            : "bg-[#0b0b0b]/40"
                    )}
                >
                    <div
                        className={clsx(
                            "absolute left-[3px] top-[3px] h-[14px] w-[14px] rounded-full bg-white transition-transform duration-200 ease-in-out",
                            notifications.promotions && "translate-x-4"
                        )}
                    />
                </button>
            </div>
            <div className='flex items-center justify-between py-3 border-b border-[#0b0b0b]/10'>
                <div>
                    <h2 className='text-[13px] font-medium mb-0.5'>Wishlist back in stock
                    </h2>
                    <p className='text-[11px] text-[#898781]'>Alert when a saved item is restocked
                    </p>
                </div>
                <button
                    onClick={() => changeNotifications("wishlist")}
                    className={clsx(
                        "relative h-5 w-9 rounded-full cursor-pointer transition-all duration-200",
                        notifications.wishlist
                            ? "bg-[#0b0b0b]"
                            : "bg-[#0b0b0b]/40"
                    )}
                >
                    <div
                        className={clsx(
                            "absolute left-[3px] top-[3px] h-[14px] w-[14px] rounded-full bg-white transition-transform duration-200 ease-in-out",
                            notifications.wishlist && "translate-x-4"
                        )}
                    />
                </button>
            </div>
            <div className='flex items-center justify-between py-3 border-b border-[#0b0b0b]/10'>
                <div>
                    <h2 className='text-[13px] font-medium mb-0.5'>Newsletter
                    </h2>
                    <p className='text-[11px] text-[#898781]'>Weekly style guide and editorial

                    </p>
                </div>
                <button
                    onClick={() => changeNotifications("newsletter")}
                    className={clsx(
                        "relative h-5 w-9 rounded-full cursor-pointer transition-all duration-200",
                        notifications.newsletter
                            ? "bg-[#0b0b0b]"
                            : "bg-[#0b0b0b]/40"
                    )}
                >
                    <div
                        className={clsx(
                            "absolute left-[3px] top-[3px] h-[14px] w-[14px] rounded-full bg-white transition-transform duration-200 ease-in-out",
                            notifications.newsletter && "translate-x-4"
                        )}
                    />
                </button>
            </div>

        </div>
        <button onClick={onSave} className='mt-4 py-2 px-4 text-sm bg-transparent border border-[#0b0b0b]\20 rounded-lg cursor-pointer font-medium'>
            Save preferences
        </button>
    </>
}