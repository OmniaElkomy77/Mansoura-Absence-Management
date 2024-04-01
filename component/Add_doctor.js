import React, { useState, useEffect } from "react"
import {
    View, Text, StatusBar, StyleSheet,
    Image, TextInput, TouchableOpacity,
    ScrollView,
    ToastAndroid,
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Api from "../constant/Api"
import NetInfo from '@react-native-community/netinfo';
import { ActivityIndicator } from "react-native-paper"
const Add_doctor = ({ navigation, route }) => {
    const [check_email, setcheck_email] = React.useState("");
    const [check_email_text, setcheck_email_text] = React.useState("")
    const [check_password_text, setcheck_password_text] = React.useState("")
    const [border_color, setborder_color] = React.useState("");
    const [border_color2, setborder_color2] = React.useState("");
    const [border_color3, setborder_color3] = React.useState("");
    const [border_color4, setborder_color4] = React.useState("");
    const [check_password, setcheck_password] = React.useState("");
    const [check_submit_password, setcheck_submit_password] = React.useState("");
    const [check_name, setcheck_name] = React.useState("")
    const [connection_Status, setconnection_Status] = useState("")
    const [Button_loading, setButton_loading] = useState(false)

    useEffect(() => {

        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")

            } else {
                setconnection_Status("Offline")
            }
        })
        return unsubscripe


    }, [])


    function validate(text) {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        // console.log(reg.test(text))
        if (reg.test(text) === false && text.length > 0) {
            setcheck_email(text);
            // return false;
            setborder_color("#f00")
        } else {
            setcheck_email(text)
            setborder_color("")
            // return true;
        }

    };

    // function check(value) {
    //     if (!(validate(value))) {
    //         // setborder_color("#f00")
    //         // console.log(!(validate(value)))
    //     } else {
    //         setborder_color("")

    //     }




    // }

    function check_password_data(value) {
        if (value.length > 0 && value.length < 3) {
            setborder_color2("#f00")
        } else {
            setborder_color2("")

        }
    }
    function check_submit_password_data(value) {
        if (value.length > 0 && value.length < 3) {
            setborder_color3("#f00")
        } else {
            setborder_color3("")

        }
    }

    function check_name_data(value) {
        // check_name
        if (value.length > 0 && value.length < 2) {
            setborder_color4("#f00")
        } else {
            setborder_color4("")

        }
    }



    async function submit() {

        if (connection_Status == "Offline") {
            ToastAndroid.showWithGravityAndOffset(
                "يجب عليك الاتصال بالانترنت",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );
        } else {
            if (check_name == "" || check_email == "", check_password == "" || check_submit_password == "") {
                ToastAndroid.showWithGravityAndOffset(
                    " يجب عليك ادخال البيانات",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
                setborder_color("#f00")
                setborder_color2("#f00")
                setborder_color3("#f00")
                setborder_color4("#f00")
            } else if (check_password != check_submit_password) {
                ToastAndroid.showWithGravityAndOffset(
                    " يرجي ادخال كلمتي سر متطابقتيين",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
                setborder_color3("#f00")
                setborder_color2("#f00")

            } else {
                setborder_color("")
                setborder_color2("")
                setborder_color3("")
                setborder_color4("")
                let data = {
                    doctor_name: check_name,
                    doctor_email: check_email,
                    doctor_pass: check_password
                }
                setButton_loading(true)
                // console.log(data)
                let fetch = await axios.post(Api.Domain + "add_doctor.php", data);
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
                    } else if (res == " name_found") {
                        ToastAndroid.showWithGravityAndOffset(
                            "هذا الاسم موجود مسبقاً",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );


                    } else {
                        ToastAndroid.showWithGravityAndOffset(
                            "تم اضافه الدكتور بنجاح",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                        setButton_loading(false)
                        setcheck_email("")
                        setcheck_password("")
                        setcheck_submit_password("")
                        setcheck_name("")


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

        }
    }


    function _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                <View style={style.header}>
                    <Text style={style.header_text}>إضافة دكتور</Text>
                </View>
            </>
        )
    }







    function _renderBody() {
        return (
            <>
                <ScrollView>
                    <View style={style.View_Image}>
                        <Image source={Images.Images.add_doctor} style={style.image} />
                    </View>
                    <View style={style.View_Textinput}>


                        <TextInput style={[style.TextInput_Field, {
                            borderWidth: border_color4 == "#f00" ? 1 : null,
                            borderColor: border_color4
                        }]}
                            placeholder="إسم الدكتور"
                            placeholderTextColor={"#999"}
                            // keyboardType="numeric"
                            value={check_name}
                            onChangeText={(value) => {
                                check_name_data(value.trim())
                                setcheck_name(value)

                            }} />





                        <TextInput style={[style.TextInput_Field, {
                            borderWidth: border_color == "#f00" ? 1 : null,
                            borderColor: border_color,

                        }]}
                            placeholder="البريد الالكتروني"
                            placeholderTextColor={"#999"}
                            keyboardType="email-address"
                            value={check_email}
                            onChangeText={(value) => {
                                validate(value)
                                setcheck_email(value)
                            }} />
                        <TextInput style={[style.TextInput_Field, {
                            borderWidth: border_color2 == "#f00" ? 1 : null,
                            borderColor: border_color2
                        }]}
                            placeholder="كلمه السر"
                            placeholderTextColor={"#999"}
                            keyboardType="numeric"
                            value={check_password}
                            onChangeText={(value) => {
                                check_password_data(value)
                                setcheck_password(value)

                            }} />
                        <TextInput style={[style.TextInput_Field, {
                            borderWidth: border_color3 == "#f00" ? 1 : null,
                            borderColor: border_color3
                        }]}
                            placeholder=" تأكيد كلمه السر"
                            placeholderTextColor={"#999"}
                            keyboardType="numeric"
                            value={check_submit_password}
                            onChangeText={(value) => {
                                check_submit_password_data(value)
                                setcheck_submit_password(value)

                            }} />

                    </View>

                    <View style={style.View_Button_Action}>
                        <TouchableOpacity
                            onPress={() => {
                                submit()
                            }}
                            style={style.button}>
                            {
                                Button_loading == true ? (
                                    <ActivityIndicator size={25} color={App_Colors.white} />
                                ) : (
                                    <Text style={style.button_text}>تأكيد</Text>
                                )

                            }

                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </>
        )
    }
    return (
        <View style={style.container}>
            {_renderHeader()}
            {_renderBody()}
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
        height: App_Size.height / 4,
        padding: 15,
        width: "100%",

        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#414"
    },
    image: {
        height: 150,
        width: 200,
        resizeMode: "center",
        // backgroundColor: "#f00"
    },
    View_Textinput: {
        // height: 100,
        padding: 15,
        width: "100%",
        // backgroundColor: "#141",
        alignItems: "center",
        justifyContent: "center"
    },
    TextInput_Field: {
        padding: 15,
        width: "95%",
        color: App_Colors.black,
        backgroundColor: "#fff",
        elevation: 4,
        borderRadius: 10,
        marginVertical: 10

    },
    View_Button_Action: {
        height: App_Size.height / 4,
        width: "100%",
        // backgroundColor: "#785",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    button: {
        height: 70,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: App_Colors.primary,
        borderRadius: 10
    },
    button_text: {
        color: App_Colors.white,
        fontSize: 20,
        fontWeight: "bold"
    }


})
export default Add_doctor;