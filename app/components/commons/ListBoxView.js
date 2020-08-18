import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  RefreshControl
} from 'react-native';
import { merge } from 'immutable';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';
import customStyle from 'app/components/home/SliderEntry.style';
import api from 'app/api/methods/categoryComposerSinger';

const LIMIT_ITEMS = 10;

function ListBoxView({ typeCallApi, navigation }) {

  const [limit] = useState(LIMIT_ITEMS);
  const [page, setPage] = useState(1);

  const [clientData, setClientData] = useState([]);
  const [serverData, serverDataLoaded] = useState([]);

  const [pendingProcess, setPendingProcess] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  const [refresh, setRefresh] = useState(false);  
  const [loadingData, setLoadingData] = useState(false);

  const requestToServer = async thePage => {
    await setLoadingData(true);
    const response = await api(thePage, limit, typeCallApi);
    await serverDataLoaded(response);
    await setLoadingData(false);
  }

  useEffect(() => {
    requestToServer(page);
  },[]);

  useEffect(() => {
    const getDataFromApi =  () => {
      if (serverData.length > 0) {
        setRefresh(false);
        setClientData(merge(clientData, serverData))
        setLoadMore(serverData.length === limit ? true : false);
        setPendingProcess(false);
      } else {
        setLoadMore(false);
      }
    }
    getDataFromApi();
  }, [serverData]);

  useEffect(() => {
    // load tiep data khi thuc su keo thanh scroll
    if (page > 1  && !refresh) {
      setPendingProcess(true);
      requestToServer(page);
    }
  }, [page]);


  useEffect(() => {
    if(clientData.length === 0 && refresh){
      setPendingProcess(true);
      requestToServer(page);
    }
  }, [refresh])

  const handleLoadMore = () => {
    if (loadMore && !pendingProcess) {
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    setClientData([]);
    setPage(1);
    setRefresh(true);
    setPendingProcess(false);
  };

  if(loadingData&& !refresh){
    return(
      <Spinner
        visible={loadingData}
        textContent={'Loading...'}
      />
    )
  }

  return(
    <SafeAreaView>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}
      >
        <WingBlank style={{ marginBottom: 100 }}>
        {clientData.map( (item, index) => (
          <View key={index}>
            <WhiteSpace size="sm" />
            <Flex>
              <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SongRoute', {id: item.id, type: typeCallApi}) }>
                  <View style={[styles.container, index === 0 ? styles.topFirst : styles.topOther]}>
                    <View
                      style={[styles.image, {
                        elevation: 10, shadowColor: '#d9d9d9',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 2,
                        borderRadius: 20,
                        backgroundColor: '#ffffff'
                      }]}
                    >
                      <Image
                        style={[styles.image]}
                        source={{ uri: item.url_image }}
                      />
                      <View style={[customStyle.textContainer]}>
                        <Text
                          style={[styles.title]}
                          numberOfLines={2}
                        >
                          { item.name.toUpperCase() }
                        </Text>
                        <Text
                          style={[customStyle.subtitle]}
                          numberOfLines={2}
                        >
                          { item.description }
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Flex.Item>
            </Flex>
            <WhiteSpace size="sm" />
          </View>
        ))}
        {loadMore ? (
          <Flex style={{marginTop:75}}>
            <Flex.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <TouchableOpacity>
                <Button loading={pendingProcess} type="primary" onPress={() => handleLoadMore()}>Load more</Button>
              </TouchableOpacity>
            </Flex.Item>
          </Flex>
        ) : null}
        </WingBlank>
      </ScrollView>
    </SafeAreaView>
  )
}

export default React.memo(ListBoxView);

const { width } = Dimensions.get('window');
const imageSize = width - 50;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  topFirst: { 
    marginTop: 10
  },
  topOther: {
    marginTop: 80
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
})