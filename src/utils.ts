import {privateApi} from "./api/api";

export const getUserName = (fullName: string): string => {
    return `_${fullName?.toLowerCase()?.split(" ").join("_")}`
}

import { DateTime } from 'luxon';

export const getTimeAgoGreatestUnit = (createdAt) => {
    const now = DateTime.now();
    const createdTime = DateTime.fromISO(createdAt);

    const diff = now.diff(createdTime, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']);

    if (diff.years >= 1) {
        return `${Math.floor(diff.years)}y`;
    } else if (diff.months >= 1) {
        return `${Math.floor(diff.months)}mo`;
    } else if (diff.days >= 1) {
        return `${Math.floor(diff.days)}d`;
    } else if (diff.hours >= 1) {
        return `${Math.floor(diff.hours)}h`;
    } else if (diff.minutes >= 1) {
        return `${Math.floor(diff.minutes)}m`;
    } else {
        return `${Math.floor(diff.seconds)}s`;
    }
};

export const likeAndUnlikeHandler = async(user, feed, setFeeds) => {
    const userId = user._id // Assuming you have the user's ID stored
    if (!userId) return;
    const hasLiked = feed.likes.includes(userId);


    // Optimistically update the UI
    setFeeds((prevFeeds) =>
        prevFeeds.map((f) => {
            if (String(f._id) === String(feed._id)) {
                return {
                    ...f,
                    likes: hasLiked
                        ? f.likes.filter((id) => id !== userId) // Unlike: remove the user's ID from the likes array
                        : [...f.likes, userId], // Like: add the user's ID to the likes array
                };
            }
            return f;
        })
    );

    try {
        const res = await privateApi({
            method: 'POST',
            url: `/post/like/${feed._id}`,
        });

        // Update the state with the actual response
        setFeeds((prevFeeds) =>
            prevFeeds.map((f) => {
                if (String(f._id) === String(feed._id)) {
                    return res.data;
                }
                return f;
            })
        );
    } catch (e) {
        console.error(e);

        // Revert the optimistic update in case of an error
        setFeeds((prevFeeds) =>
            prevFeeds.map((f) => {
                if (String(f._id) === String(feed._id)) {
                    return {
                        ...f,
                        likes: hasLiked
                            ? [...f.likes, userId] // Revert the unlike: add the user's ID back to the likes array
                            : f.likes.filter((id) => id !== userId), // Revert the like: remove the user's ID from the likes array
                    };
                }
                return f;
            })
        );
    }
}