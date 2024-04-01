import React, { useEffect, useState } from "react"
import {
    View, Text, StatusBar, StyleSheet, Image, TouchableOpacity,
    ScrollView, FlatList, ToastAndroid, Modal, TouchableWithoutFeedback, TextInput
} from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"
import axios from "axios"
import Api from "../constant/Api"
import { ActivityIndicator } from "react-native-paper"
import ModalHome from 'react-native-modalbox';
import NetInfo from '@react-native-community/netinfo';
const Previous_lecture = ({ navigation, route }) => {
    const [Doctors, setDoctors] = useState([])
    const [loading, setloading] = useState(false)
    const [doctor_id, setdoctor_id] = useState("")
    const [modalVisible, setmodalVisible] = useState(false)
    const [Modal_delete, setModal_delete] = useState(false)
    const [Modal_edit_doctor, setModal_edit_doctor] = useState(false)
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [submit_password, setsubmit_password] = useState("")
    const [border_color, setborder_color] = React.useState("");
    const [border_color2, setborder_color2] = React.useState("");
    const [border_color3, setborder_color3] = React.useState("");
    const [border_color4, setborder_color4] = React.useState("");
    const [connection_Status, setconnection_Status] = useState("")
    const [Button_loading, setButton_loading] = useState(false)



    useEffect(() => {




        const unsubscripe = NetInfo.addEventListener(state => {

            if (state.isConnected == true) {
                setconnection_Status("Online")
                All_Doctors()
            } else {
                setconnection_Status("Offline")
            }
        })
        return unsubscripe





    }, [])
    async function All_Doctors() {
        // let data = {

        // }
        setloading(true)
        let fetch = await axios.get(Api.Domain + "select_doctor.php");
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

                setDoctors(res)
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

    async function delete_doctor(doctor_id) {
        let data = {
            doctor_id: doctor_id

        }
        // console.log(data)
        setloading(true)
        let fetch = await axios.post(Api.Domain + "delete_doctor.php", data);
        if (fetch.status == 200) {
            let res = fetch.data
            // console.log(res)
            if (res == "error") {
                ToastAndroid.showWithGravityAndOffset(
                    "حدث خطأ ما",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );


            } else if (res == "success") {
                ToastAndroid.showWithGravityAndOffset(
                    "تم مسح الدكتور",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
                All_Doctors()
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



    function validate(text) {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        // console.log(reg.test(text))
        if (reg.test(text) === false && text.length > 0) {
            setemail(text);
            // return false;
            setborder_color("#f00")
        } else {
            setemail(text)
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



















    async function edit_doctor_fun() {
        if (doctor_id == "" || name == "" || password == "" || email == "" || submit_password == "") {
            ToastAndroid.showWithGravityAndOffset(
                " يرجي ادخال البيانات الجديده",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );
            setborder_color("#f00")
            setborder_color2("#f00")
            setborder_color3("#f00")
            setborder_color4("#f00")


        } else if (submit_password != password) {
            ToastAndroid.showWithGravityAndOffset(
                "تأكد من تشابهه كلمتي السر",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20
            );
            setborder_color3("#f00")
            setborder_color2("#f00")



        } else

            if (name * 0 == 0) {
                ToastAndroid.showWithGravityAndOffset(
                    "يرجي ادخال بيانات صحيحه",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
                // 
                setborder_color4("#f00")
            } else if (email * 0 == 0) {
                ToastAndroid.showWithGravityAndOffset(
                    "يرجي ادخال بيانات صحيحه",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
                setborder_color("#f00")
            } else {

                setborder_color("")
                setborder_color2("")
                setborder_color3("")
                setborder_color4("")

                let data = {
                    doctor_id: doctor_id,
                    doctor_name: name,
                    doctor_email: email,
                    doctor_pass: password

                }
                // console.log(data)
                setButton_loading(true)
                setloading(true)
                let fetch = await axios.post(Api.Domain + "update_doctor.php", data);
                if (fetch.status == 200) {
                    let res = fetch.data
                    // console.log(res)
                    if (res == "error") {
                        ToastAndroid.showWithGravityAndOffset(
                            "حدث خطأ ما",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );


                    } else if (res == "success") {
                        ToastAndroid.showWithGravityAndOffset(
                            "تم تعديل بيانات الدكتور",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            20,
                            20
                        );
                        All_Doctors()
                        // setemail("")
                        // setpassword("")
                        setsubmit_password("")
                        // setname("")
                        setButton_loading(false)
                        setModal_edit_doctor(false)
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
        setsubmit_password("")
    }











    function _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                <View style={style.header}>
                    <Text style={style.header_text}>الأساتذه الجامعيين</Text>
                </View>
            </>
        )
    }
    function _renderBody() {
        return (
            <>
                {/* [{"doctor_email": 
                "zidansief22@gmail.com",
                 "doctor_id": "1", 
                 "doctor_name": "ثروت ثروت",
                  "doctor_pass": "123321"}, 
                  {"doctor_email": "tharwatbadr21@gmail.com", 
                  "doctor_id": "2", "doctor_name": "د / ثروت فرج",
                   "doctor_pass": "12321"},
                    {"doctor_email": "zidansief22@gmail.com", 
                    "doctor_id": "4",
                     "doctor_name": "د سيف زيدان",
                      "doctor_pass": "123321"}] */}

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
                            <FlatList data={Doctors}
                                renderItem={({ index, item }) => (
                                    <View style={style.View_Action}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // navigation.navigate("Doctor_classes",
                                                //     { doctor_id: item.doctor_id })
                                                setmodalVisible(true)
                                                setdoctor_id(item.doctor_id)
                                                setemail(item.doctor_email)
                                                setname(item.doctor_name)
                                                setpassword(item.doctor_pass)
                                            }

                                            }

                                            style={style.button}>
                                            <Image source={Images.Images.doctor} style={style.Button_Image} />
                                            <View style={style.Button_View}>
                                                <Text style={style.Button_text}>{item.doctor_name}</Text>
                                            </View>
                                            {/* <View>
                                        <Text style={style.date}>2023-3-1</Text>
                                    </View> */}
                                        </TouchableOpacity>
                                    </View>

                                )


                                }

                                ListEmptyComponent={() => (
                                    <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                        <Text style={{ color: "#999", fontSize: 20 }}>لايوجد أساتذه جامعيين</Text>
                                    </View>
                                )} />
                }








            </>
        )
    }


    function modalVisible_bottom() {
        return (
            <ModalHome
                onRequestClose={() => {
                    setmodalVisible(false)
                }}
                style={{
                    height: (App_Size.height) / 2.8,

                    backgroundColor: '#fff',

                }}
                backButtonClose={true}
                backdropPressToClose={true}
                isOpen={modalVisible}
                backdrop={true}

                onClosed={() => {
                    setmodalVisible(false)
                }}
                swipeArea={50}

                position="bottom"
                useNativeDriver={true}>
                <TouchableOpacity
                    style={{

                        height: 100,

                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#777',
                        paddingRight: 15,
                    }}
                    onPress={() => {
                        navigation.navigate("Doctor_classes",
                            { doctor_id: doctor_id })
                    }}>
                    <Text style={{ fontSize: 20, color: App_Colors.black }}> الدفعات</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{

                        height: 100,

                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingRight: 15,
                        borderBottomWidth: 1,
                        borderColor: '#777',
                    }}
                    onPress={() => {
                        setModal_edit_doctor(true)
                        setmodalVisible(false)
                    }}>
                    <Text style={{ fontSize: 20, color: App_Colors.black }}>تعديل بيانات الدكتور</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{

                        height: 100,

                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingRight: 15,
                        // borderBottomWidth: 1,
                        // borderColor: '#777',
                    }}
                    onPress={() => {
                        setModal_delete(true)
                        setmodalVisible(false)
                    }}>
                    <Text style={{ fontSize: 20, color: App_Colors.black }}> مسح الدكتور</Text>
                </TouchableOpacity>


            </ModalHome>
        )
    }




    function delete_modal() {
        return (
            <Modal
                visible={Modal_delete}
                onRequestClose={() => {
                    setModal_delete(false)
                }}
                animationType="slide"
                // presentationStyle="formSheet"s
                transparent={true}>
                <View
                    style={{
                        // opacity:0.7,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {
                            setModal_delete(false)
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <View
                        style={{
                            height: App_Size.height,
                            // width: width,
                            flex: 1,
                            // alignContent: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <View
                            style={{
                                // height:height,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                                width: '90%',
                                backgroundColor: App_Colors.white,
                                borderRadius: 10,
                                elevation: 5,
                                paddingVertical: 15,
                                marginBottom: 10,
                            }}>

                            <View
                                style={{
                                    // height: 50,
                                    // width: '100%',
                                    // backgroundColor: "#858",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{ color: App_Colors.black, fontWeight: 'bold', fontSize: 20 }}>
                                    هل انت متأكد من مسح الدكتور؟
                                </Text>
                            </View>



                            <View
                                style={{
                                    height: 100,
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    // backgroundColor: "#eee",
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {

                                        setModal_delete(false)
                                        delete_doctor(doctor_id)
                                    }}
                                    style={{
                                        height: 50,
                                        width: 100,
                                        backgroundColor: App_Colors.primary,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>
                                    <Text
                                        style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                        تأكيد
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {
                            setModal_delete(false)
                        }}>
                        <View
                            style={{
                                width: '100%',
                            }}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </Modal>

        )
    }



    function edit_doctor() {
        return (
            <Modal
                visible={Modal_edit_doctor}
                onRequestClose={() => {
                    setModal_edit_doctor(false)
                }}
                animationType="slide"
                // presentationStyle="formSheet"s
                transparent={true}>
                <View
                    style={{
                        // opacity:0.7,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {
                            setModal_edit_doctor(false)
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <View
                        style={{
                            height: App_Size.height,
                            // width: width,
                            flex: 1,
                            // alignContent: 'center',
                            justifyContent: 'space-around',
                        }}>
                        <View
                            style={{
                                // height:height,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                                width: '90%',
                                backgroundColor: App_Colors.white,
                                borderRadius: 10,
                                elevation: 5,
                                paddingVertical: 15,
                                marginBottom: 10,
                            }}>

                            <View
                                style={{
                                    // height: 50,
                                    // width: '100%',
                                    // backgroundColor: "#858",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{ color: App_Colors.black, fontWeight: 'bold', fontSize: 20 }}>
                                    تعديل بيانات الدكتور
                                </Text>
                            </View>


                            <View style={{
                                // height: "40%",
                                // backgroundColor: "#125",
                                alignItems: 'center',
                                justifyContent: "center"

                            }}>
                                <TextInput style={{
                                    padding: 15,

                                    width: "95%", backgroundColor: "#eee",
                                    color: App_Colors.black,
                                    borderRadius: 10,
                                    marginTop: 20,
                                    borderWidth: border_color4 == "#f00" ? 1 : null,
                                    borderColor: border_color4,
                                }}
                                    placeholder="إدخل اسم الدكتور"
                                    placeholderTextColor={"#999"}
                                    value={name}
                                    onChangeText={(value) => {
                                        setname(value)
                                        check_name_data(value)
                                    }}

                                />


                                <TextInput style={{
                                    padding: 15,

                                    width: "95%", backgroundColor: "#eee",
                                    color: App_Colors.black,
                                    borderRadius: 10,
                                    marginTop: 20,
                                    borderWidth: border_color == "#f00" ? 1 : null,
                                    borderColor: border_color,
                                }}
                                    placeholder="إدخل البريد الالكتروني"
                                    placeholderTextColor={"#999"}
                                    value={email}
                                    onChangeText={(value) => {
                                        setemail(value)
                                        validate(value)
                                    }}

                                />

                                <TextInput style={{
                                    padding: 15,

                                    width: "95%", backgroundColor: "#eee",
                                    color: App_Colors.black,
                                    borderRadius: 10,
                                    marginTop: 20,
                                    borderWidth: border_color2 == "#f00" ? 1 : null,
                                    borderColor: border_color2,
                                }}
                                    placeholder="ادخل كلمه السر"
                                    placeholderTextColor={"#999"}
                                    keyboardType="numeric"
                                    value={password}
                                    onChangeText={(value) => {
                                        setpassword(value)
                                        check_password_data(value)
                                    }}

                                />

                                <TextInput style={{
                                    padding: 15,

                                    width: "95%", backgroundColor: "#eee",
                                    color: App_Colors.black,
                                    borderRadius: 10,
                                    marginTop: 20,
                                    borderWidth: border_color3 == "#f00" ? 1 : null,
                                    borderColor: border_color3,
                                }}
                                    placeholder="تأكيد كلمه السر"
                                    placeholderTextColor={"#999"}
                                    value={submit_password}
                                    keyboardType="numeric"
                                    onChangeText={(value) => {
                                        setsubmit_password(value)
                                        check_submit_password_data(value)
                                    }}

                                />











                            </View>
                            <View
                                style={{
                                    height: 100,
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    // backgroundColor: "#eee",
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {


                                        edit_doctor_fun()

                                    }}
                                    style={{
                                        height: 50,
                                        width: 100,
                                        backgroundColor: App_Colors.primary,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>

                                    {
                                        Button_loading == true ?
                                            <ActivityIndicator size={25} color={App_Colors.white} /> :
                                            <Text
                                                style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                                تأكيد
                                            </Text>
                                    }

                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {
                            setModal_edit_doctor(false)
                        }}>
                        <View
                            style={{
                                width: '100%',
                            }}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </Modal>



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
            {modalVisible_bottom()}
            {delete_modal()}
            {edit_doctor()}

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
        width: "75%",
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
