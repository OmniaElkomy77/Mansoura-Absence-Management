import React from "react"
import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import Images from "../constant/Images"

const Home = ({ navigation, route }) => {
    function _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={App_Colors.primary} barStyle="light-content" />
                <View style={style.header}>
                    <Text style={style.header_text}>الصفحه الرئيسية</Text>
                </View>
            </>
        )
    }
    function _renderBody() {
        return (
            <>
                <ScrollView>


                    <View style={style.View_Action}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Add_doctor")

                            }}

                            style={style.button}>
                            <Image source={Images.Images.add_doctor} style={style.Button_Image} />
                            <View style={style.Button_View}>
                                <Text style={style.Button_text}>إضافة دكتور</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={style.View_Action}>
                        <TouchableOpacity
                            onPress={() => {

                                navigation.navigate('Doctors')
                            }}


                            style={style.button}>
                            <Image source={Images.Images.professor} style={style.Button_Image} />
                            <View style={style.Button_View}>
                                <Text style={style.Button_text}> الأساتذه الجامعيين</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={style.View_Action}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Classes")


                            }}


                            style={style.button}>
                            <Image source={Images.Images.classes} style={style.Button_Image} />
                            <View style={style.Button_View}>
                                <Text style={style.Button_text}> الدفعات</Text>
                            </View>
                        </TouchableOpacity>
                    </View>





                </ScrollView>
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

        padding: 15,
        width: "100%",

        alignItems: "center",
        justifyContent: "center"
    },
    View_Action: {

        padding: 15,
        width: '100%',

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

        height: 50,
        justifyContent: "center"
    },
    Button_text: {
        color: App_Colors.black,
        fontSize: 18,
        fontWeight: "700"
    }
}
)
export default Home;
