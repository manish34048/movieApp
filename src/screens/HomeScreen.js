import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import React, { useEffect, useState } from 'react'
import { styles } from '../theme/index';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchNowPlayingMovies, fetchUpcomingMovies, fetchTopRatedMovies, fetchPopularMovies } from '../../api/moviedb';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

const ios = Platform.OS === 'ios';

const HomeScreen = () => {

  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(()=>{
    nowPlayingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getPopularMovies();
  },[]);

  const nowPlayingMovies = async ()=>{
    const data = await fetchNowPlayingMovies();
    console.log('got trending', data.results.length)
    if(data && data.results) setNowPlaying(data.results);
    setLoading(false)
  }

  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies();
    console.log('got upcoming', data.results.length)
    if(data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies();
    console.log('got top rated', data.results.length)
    if(data && data.results) setTopRated(data.results);
  }
  const getPopularMovies = async ()=>{
    const data = await fetchPopularMovies();
    console.log('got popular', data.results.length)
    if(data && data.results) setPopular(data.results);
  }

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text
            className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading? (
          <Loading />
        ):(
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >

          {/* Trending Movies Carousel */}
          <TrendingMovies data={nowPlaying} />

          {/* upcoming movies row */}
          <MovieList title="Upcoming" data={upcoming} />

          {/* top rated movies row */}
          <MovieList title="Top Rated" data={topRated} />

          {/* top rated movies row */}
          <MovieList title="Popular" data={popular} />

        </ScrollView>
        )
      }
    </View>
  )
}

export default HomeScreen;