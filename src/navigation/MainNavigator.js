import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import { useDispatch, useSelector } from 'react-redux'
import AuthStack from '../navigation/AuthStack'
import { fetchSession } from '../db'
import { setUser } from '../features/auth/authSlice'

const MainNavigator = () => {

  const idToken = useSelector(state => state.auth.idToken)
  const dispatch = useDispatch()

  useEffect(()=>{
    (async ()=>{
      const sessions = await fetchSession()
      if(sessions){
        dispatch(setUser(sessions))
      }
    })()
  },[])

  return (
    <NavigationContainer>
      {idToken ? <TabNavigator/>  : <AuthStack/> } 
    </NavigationContainer>
  )
}

export default MainNavigator
