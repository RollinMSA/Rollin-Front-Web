import { call, put, takeLatest } from "redux-saga/effects";
import { defaultAxios } from "./AxiosApi";
import { selectAllGifts, selectGiftByKey, insertGift, insertGiftFail, load2, requestGetGiftName, requestSort, updateView, postEmailFail, postEmail, } from "./gifts";
function* handleSearchGifts(data) {
    try {
        console.log("search start");
        const giftName = data.payload;
        let gifts;
        if (giftName === undefined || giftName === "") {
            gifts = yield call(defaultAxios, "/gift/", "get", undefined); //call은 주어진 함수를 실행한다
        }
        else {
            console.log(giftName);
            gifts = yield call(defaultAxios, `/gift/search/${giftName}`, "get", undefined);
        }
        yield put(selectAllGifts(gifts.data)); //put은 특정 액션을 dispatch한다
    }
    catch (error) {
        console.log(error);
    }
}
function* handleSortGift(data) {
    try {
        console.log("sort start");
        const sortKey = data.payload.sortKey;
        const allGifts = yield call(defaultAxios, "/gift/", "get", undefined);
        console.log(allGifts, sortKey);
        const gifts = allGifts.data.slice();
        if (sortKey === "default") {
            console.log("no sort");
        }
        else if (sortKey === "count") {
            gifts.sort(function (a, b) {
                return b.count - a.count;
            });
            console.log("sort by count");
        }
        else if (sortKey === "view") {
            gifts.sort(function (a, b) {
                return b.views - a.views;
            });
            console.log("sort by view");
        }
        else if (sortKey === "lprice") {
            gifts.sort(function (a, b) {
                return a.price - b.price;
            });
            console.log("sort by lprice");
        }
        else if (sortKey === "hprice") {
            gifts.sort(function (a, b) {
                return b.price - a.price;
            });
            console.log("sort by hprice");
        }
        yield put(selectAllGifts(gifts));
    }
    catch (error) {
        console.log(error);
    }
}
function* handleSelectGiftByKey(data) {
    try {
        // const giftId = yield select((state) => state.gifts.giftId);
        console.log("handleSelectGiftByKey, data: ", data);
        console.log("handleSelectGiftByKey, data.payload: ", data.payload);
        const giftId = data.payload;
        // console.log("handleSelectGiftByKey, giftId:", giftId);
        const giftByKey = yield call(defaultAxios, `/gift/${giftId}`, "get", undefined);
        console.log("handleSelectGiftByKey, giftByKey: ", giftByKey);
        yield put(selectGiftByKey(giftByKey));
    }
    catch (error) {
        console.error(error);
    }
}
// function* handleSelectReceivers(data: { payload: any }) {
//   try {
//     // const userId = yield select((state) => state.user.me.uid);
//     const userId = data.payload;
//     const receivers: Array<user> = yield call(
//       defaultAxios,
//       `/gift/receiver/${userId}`,
//       "get",
//       undefined
//     );
//     console.log("handleSelectReceivers, receivers:", receivers);
//     yield put(selectReceivers(receivers));
//   } catch (error) {
//     console.error(error);
//   }
// }
function* postGift(data) {
    try {
        console.log("postGift, data:", data);
        console.log("postGift, data.payload", data.payload);
        yield call(defaultAxios, "/gift", "post", data.payload);
        alert("선물을 보냈습니다");
    }
    catch (error) {
        yield put(insertGiftFail(error));
        console.error(error);
    }
}
function* handleGiftsView(data) {
    try {
        const id = data.payload;
        console.log("view id:", id);
        yield call(defaultAxios, `/gift/${id}`, "put", undefined);
    }
    catch (error) {
        console.log(error);
    }
}
function* sendEmail(data) {
    try {
        console.log("sendEmail, data:", data);
        console.log("sendEmail, data.payload:", data.payload);
        console.log("giftSaga-sendEmail");
        yield call(defaultAxios, "/mail/send", "post", data.payload);
    }
    catch (error) {
        yield put(postEmailFail(error));
        console.error(error);
    }
}
export function* watchGetGifts() {
    yield takeLatest(requestGetGiftName, handleSearchGifts);
    yield takeLatest(requestSort, handleSortGift);
    yield takeLatest(load2, handleSelectGiftByKey);
    // yield takeLatest(load3, handleSelectReceivers);
    yield takeLatest(insertGift, postGift);
    yield takeLatest(updateView, handleGiftsView);
    yield takeLatest(postEmail, sendEmail);
}
