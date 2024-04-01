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
import { FAB } from "react-native-paper"
import AntDesign from "react-native-vector-icons/AntDesign"
import axios from "axios"
import Api from "../constant/Api"
import ModalHome from 'react-native-modalbox';
import NetInfo from '@react-native-community/netinfo';
const Studing_subject = ({ navigation, route }) => {
    const [Modal_add_subject, setModal_add_subject] = React.useState(false);
    const [subject_name, setsubject_name] = useState("")
    const [subject_id, setsubject_id] = useState("")
    const [All_subject, setAll_subject] = useState([])
    const [loading, setloading] = useState(false)
    const [Modal_delete, setModal_delete] = useState(false)
    const [modalVisible, setmodalVisible] = useState(false)
    const [connection_Status, setconnection_Status] = useState("")
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
        // console.log(generation_id)
        let data = {
            generation_id: generation_id
        }
        setloading(true)
        let fetch = await axios.post("https://camp-coding.online/absence_Mansoura_Un/doctor/" + "select_subject.php", data);
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



    async function Add_subject() {
        const { generation_id } = route.params
        let data = {
            subject_name: subject_name,
            subject_description: "لا شئ",
            generation_id: generation_id
        }
        // console.log(data)
        setloading(true)
        let fetch = await axios.post(Api.Domain + "add_subject.php", data);
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


            } else if (res == "name_found") {
                ToastAndroid.showWithGravityAndOffset(
                    "هذه الاسم موجود سابقاً",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
            } else {

                // setAll_subject(res)
                _All_subject()
                setsubject_name("")

                // setloading(false)


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


    async function delete_subject(subject_id) {
        let data = {
            subject_id: subject_id

        }
        // console.log(data)
        setloading(true)
        let fetch = await axios.post(Api.Domain + "delete_subject.php", data);
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
                    "تم مسح الماده",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    20,
                    20
                );
                _All_subject()
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
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // setModal_delete(true)
                                                    setmodalVisible(true)
                                                    setsubject_id(item.subject_id)
                                                }}

                                                style={style.button}>
                                                <Image source={Images.Images.subject} style={style.Button_Image} />
                                                <View style={style.Button_View}>
                                                    <Text style={style.Button_text}>{item.subject_name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                    ListEmptyComponent={() => (
                                        <View style={{ alignItems: "center", justifyContent: "center", height: App_Size.height }}>
                                            <Text style={{ color: "#999", fontSize: 20 }}>لايوجد مواد</Text>
                                        </View>
                                    )}

                                />


                                <View>
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
                                </View>
                            </>
                }



            </>
        )
    }


    function _modal() {
        return (
            <Modal
                visible={Modal_add_subject}
                onRequestClose={() => {
                    setModal_add_subject(false)
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
                            setModal_add_subject(false)
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
                                    إضافه مادة دراسية
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
                                    marginTop: 20
                                }}
                                    placeholder="إدخل اسم المادة"
                                    placeholderTextColor={"#999"}
                                    value={subject_name}
                                    onChangeText={(value) => {
                                        setsubject_name(value)
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

                                        setModal_add_subject(false)
                                        if (connection_Status == "Offline") {
                                            ToastAndroid.showWithGravityAndOffset(
                                                "يجب عليك الاتصال بالانترنت",
                                                ToastAndroid.SHORT,
                                                ToastAndroid.BOTTOM,
                                                20,
                                                20
                                            );
                                        } else {
                                            Add_subject()
                                        }

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
                            setModal_add_subject(false)
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
                                    هل انت متأكد من مسح الماده؟
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
                                        if (connection_Status == "Offline") {
                                            ToastAndroid.showWithGravityAndOffset(
                                                "يجب عليك الاتصال بالانترنت",
                                                ToastAndroid.SHORT,
                                                ToastAndroid.BOTTOM,
                                                20,
                                                20
                                            );
                                        } else {
                                            delete_subject(subject_id)
                                        }

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


    function modalVisible_bottom() {
        return (
            <ModalHome
                onRequestClose={() => {
                    setmodalVisible(false)
                }}
                style={{
                    height: App_Size.height / 4,

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
                        setModal_delete(true)
                    }}>
                    <Text style={{ fontSize: 20, color: App_Colors.black }}>مسح الماده</Text>
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
                        navigation.navigate("Previous_lecture", {
                            subject_id: subject_id,
                            generation_id: route.params.generation_id
                        })
                    }}>
                    <Text style={{ fontSize: 20, color: App_Colors.black }}> المحاضرات</Text>
                </TouchableOpacity>

            </ModalHome>
        )
    }








    return (
        <>
            <View style={style.container}>

                {_renderHeader()}
                {_renderBody()}
                {_modal()}
                {delete_modal()}
                {modalVisible_bottom()}
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
    fab: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
        // color: App_Colors.primary
        backgroundColor: App_Colors.primary


    }
})

export default Studing_subject;