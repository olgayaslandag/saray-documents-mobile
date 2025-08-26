import { StyleSheet } from "react-native"

const styleAuth = StyleSheet.create({
    form: {
        container: {
            justifyContent: 'center',
            flex: 8
        },        
        title: {
            fontSize: 20,
            marginBottom: 20,      
            textAlign: 'center',
            fontWeight: 'bold'    
        },

        item: {
            container: {
                marginBottom: 10
            },
    
            input: {
                height: 50,
                borderWidth: 1,
                padding: 10,
                borderColor: '#C1C1C1',
                borderRadius: 10,
                color: 'black',                
            },
            
            inputError: {
                height: 50,
                borderWidth: 1,
                padding: 10,
                borderColor: 'red',
                borderRadius: 10,
                color: 'red',                
            }
        },

        button: {
            container: {
                //flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 5
            },
            row: {
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
            },
            text: {
                borderRadius: 10,
                padding: 10,
                fontSize: 16, 
                fontWeight: 500,   
                borderWidth: 1,  
                textAlign: 'center'                       
            }
                     
        }      
    }
});


export default styleAuth;