import React, { useEffect, useState } from "react"
import {
    View, Text, StatusBar, StyleSheet,
    FlatList, Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    TextInput,
    ToastAndroid, ActivityIndicator
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import { Checkbox } from "react-native-paper"
import AntDesign from "react-native-vector-icons/AntDesign"
import axios from "axios"
import Api from "../constant/Api"
import NetInfo from '@react-native-community/netinfo';
const Select_subject = ({ navigation, route }) => {

    const [All_subject, setAll_subject] = useState([])
    const [loading, setloading] = useState(false)
    const [connection_Status, setconnection_Status] = useState("")
    // const [checked, setChecked] = React.useState(false);

    useEffect(() => {

        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")

                _All_subject()
            } else {
                setconnection_Status("Offline")
            }
        })
        return unsubscripe



    }, [])
    async function _All_subject() {
        const { generation_id } = route.params
        const { doctor_id } = route.params
        let data = {
            generation_id: generation_id,
            doctor_id: doctor_id
        }
        setloading(true)
        let fetch = await axios.post(Api.Domain + "select_subject.php", data);
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

                setAll_subject(res)
                // console.log(res)
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


    async function checked_fun(subject_id, index) {
        const { doctor_id } = route.params
        let data = {
            subject_id: subject_id,
            doctor_id: doctor_id

        }
        console.log(data)
        let fetch = await axios.post(Api.Domain + "assign_sub_to_dr.php", data);
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


            } else if (res == "success") {
                _All_subject()
                let data = All_subject

                if (data[index].assign == 0) {
                    data[index].assign = 1
                    setAll_subject(data)
                    // setAll_subject(res)

                } else if (data[index].assign == 1) {
                    data[index].assign = 0
                    setAll_subject(data)
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
                    <Text style={style.header_text}>المواد الدراسية</Text>
                </View>
            </>
        )
    }

    function _renderBody() {
        return (
            <>

                {/* [{"generation_id": "1",
                 "subject_description": "لاشي",
                  "subject_id": "2", 
                  "subject_img": null,
                   "subject_name": "فيزياء"}] */}
                {
                    connection_Status == "Offline" ?
                        <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                            <Text style={{ color: "#999", fontSize: 20 }}> يجب عليك الاتصال بالانترنت</Text>
                        </View>
                        :


                        loading == true ?
                            <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                <ActivityIndicator size={30} color={App_Colors.primary} />
                            </View>
                            :
                            <>
                                <FlatList
                                    data={All_subject}
                                    renderItem={({ index, item }) => (
                                        <View style={style.View_Action}>
                                            <View


                                                style={style.button}>
                                                <Image source={Images.Images.subject} style={style.Button_Image} />
                                                <View style={style.Button_View}>
                                                    <Text style={style.Button_text}>{item.subject_name}</Text>
                                                </View>

                                                <Checkbox
                                                    status={item.assign == 1 ? "checked" : "unchecked"}
                                                    onPress={() => {
                                                        // setChecked(!checked);
                                                        item.assign == 1 ?
                                                            null
                                                            :
                                                            checked_fun(item.subject_id, index)
                                                        // console.log(index)


                                                    }}
                                                />


                                            </View>
                                        </View>
                                    )}

                                    ListEmptyComponent={() => (
                                        <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                            <Text style={{ color: "#999", fontSize: 20 }}>لايوجد مواد</Text>
                                        </View>
                                    )}

                                />


                                {/* <View>
                            <FAB
                                icon={() => {
                                    return (
                                        <AntDesign name="plus" color={App_Colors.white} size={24} />
                                    )
                                }}

                                style={style.fab}
                                onPress={() =>
                                    setModal_add_subject(true)
                                }
                            />
                        </View> */}
                            </>
                }



            </>
        )
    }









    return (
        <>
            <View style={style.container}>

                {_renderHeader()}
                {_renderBody()}

            </View>
        </>
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
        width: "60%",
        // backgroundColor: "#525",
        height: 50,
        justifyContent: "center"
    },
    Button_text: {
        color: App_Colors.black,
        fontSize: 18,
        fontWeight: "700"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
        // color: App_Colors.primary
        backgroundColor: App_Colors.primary


    }
})

export default Select_subject;