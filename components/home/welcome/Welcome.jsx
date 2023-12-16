import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'

import styles from './welcome.style'
import { useRouter } from 'expo-router'
import { SIZES, icons } from '../../../constants'

const Welcome = () => {
  const [activeJobs,setActiveJobs]=useState("Full-time")
  const router = useRouter()
  const jobTypes = ["Full-time","Part-Time","Contractor"]

  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.userName}>Hello Adrian</Text>
            <Text style={styles.welcomeMessage}>Find your perfect job</Text>
        </View>

        <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
                <TextInput 
                style={styles.searchInput}
                value=''
                onChange={()=>{}}
                placeholder='What are you looking for'
              />
            </View>
            <TouchableOpacity style={styles.searchBtn}>
                <Image
                  source={icons.search}
                  resizeMode='contain'
                  style={styles.searchBtnImage}
                />
            </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
            <FlatList
              data={jobTypes}
              renderItem={({item})=>(
                <TouchableOpacity 
                  style={styles.tab(activeJobs,item)}
                  onPress={()=>{
                    setActiveJobs(item)
                    router.push(`/search/${item}`)
                  }}
                >
                    <Text style={styles.tabText(activeJobs,item)}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item=>item}
              contentContainerStyle={{columnGap:SIZES.small}}
              horizontal
            />
        </View>
    </View>
  )
}

export default Welcome