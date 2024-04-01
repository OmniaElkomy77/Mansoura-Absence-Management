import React, { useEffect, useState } from "react"
import {
    View, Text, StatusBar, StyleSheet, Image, TouchableOpacity,
    ScrollView, FlatList, ToastAndroid
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import axios from "axios"
import Api from "../constant/Api"
import { ActivityIndicator } from "react-native-paper"
import NetInfo from '@react-native-community/netinfo';
const Previous_lecture = ({ navigation, route }) => {
    const [lectures, setlectures] = useState([])
    const [loading, setloading] = useState(false)
    const [connection_Status, setconnection_Status] = useState("")
    useEffect(() => {
        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
                All_lectures()
            } else {
                setconnection_Status("Offline")
            }
        })
        return unsubscripe



    }, [])
    async function All_lectures() {
        setloading(true)
        const { generation_id } = route.params
        const { subject_id } = route.params
        let data = {
            generation_id: generation_id,
            subject_id: subject_id
        }
        setloading(true)
        let fetch = await axios.post(Api.Domain + "select_lecture.php", data);
        if (fetch.status == 200) {
            let res = fetch.data
            if (res == "error") {
                ToastAndroid.showWithGravityAndOffset(
                    "حدث خطأ ما",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );


            } else {

                setlectures(res)
                // for (let i = 0; i < res.length; i++){
                //    let date_index=res[i].lecture_date.IndexOf(" ")
                //     date=slice(date_index+1)
                // }
                // // console.log(res)
                setloading(false)


            }
        } else {
            ToastAndroid.showWithGravityAndOffset(
                "حدث خطأ ما",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );
        }
    }

    function _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                <View style={style.header}>
                    <Text style={style.header_text}>المحاضرات</Text>
                </View>
            </>
        )
    }
    function _renderBody() {
        return (
            <>
                {/* {"generation_id": "1",
                 "lecture_code": "1096012892", 
                 "lecture_date": "2023-02-27 09:08:42.247790", 
                "lecture_id": "35", 
                "lecture_name": "تيست٥٥",
                 "locked": "0", "subject_id": "2"} */}

                {

                    connection_Status == "Offline" ?
                        <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                            <Text style={{ color: "#999", fontSize: 20 }}> يجب عليك الاتصال بالانترنت</Text>
                        </View>
                        :


                        loading == true ?
                            <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                <ActivityIndicator size={30} color={App_Colors.primary} />
                            </View> :
                            <FlatList data={lectures}
                                renderItem={({ index, item }) => (
                                    <View style={style.View_Action}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("Absence", {
                                                    lecture_id: item.lecture_id,
                                                    generation_id: route.params.generation_id
                                                })
                                                // console.log(route.params.generation_id)
                                            }}

                                            style={style.button}>
                                            <Image source={Images.Images.previous_lecture} style={style.Button_Image} />
                                            <View style={style.Button_View}>
                                                <Text style={style.Button_text}>{item.lecture_name}</Text>
                                            </View>
                                            <View>
                                                <Text style={style.date}>{item.lecture_date.slice(0, 10)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                )}


                                ListEmptyComponent={() => (
                                    <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                        <Text style={{ color: "#999", fontSize: 20 }}>لايوجد محاضرات</Text>
                                    </View>
                                )}






                            />


                }






            </>
        )
    }
    return (
        <View style={style.container}>
            {
                _renderHeader()
            }
            {
                _renderBody()
            }
        </View>
    )

}
const style = StyleSheet.create({
    container: {
        backgroundColor: App_Colors.white,
        flex: 1,
    },
    header: {
        backgroundColor: App_Colors.white,
        elevation: 5,
        height: 70,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    header_text: {
        color: App_Colors.black,
        fontSize: 25,
        fontWeight: "bold"
    },
    View_Image: {
        // height: 150,
        padding: 15,
        width: "100%",

        alignItems: "center",
        justifyContent: "center"
    },
    View_Action: {
        // height: 200,
        padding: 15,
        width: '100%',
        // backgroundColor: "#514",
        alignItems: "center",
        justifyContent: "space-around"
    },
    button: {
        // height: 100,
        padding: 10,
        width: "95%",
        backgroundColor: "#fff",
        elevation: 7,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"

    },
    Button_Image: {
        resizeMode: "center",
        height: 70,
        width: 70,

    },
    Button_View:
    {
        width: "50%",
        // backgroundColor: "#525",
        height: 50,
        justifyContent: "center"
    },
    Button_text: {
        color: App_Colors.black,
        fontSize: 18,
        fontWeight: "700"
    },
    date: {
        color: "#999",
        fontSize: 15
    }
}
)
export default Previous_lecture;
