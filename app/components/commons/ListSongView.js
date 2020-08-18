import React, {useState, useEffect, useRef} from 'react';
import { merge } from 'immutable';
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ListView from 'app/components/commons/ListView';
import LoadingData from 'app/components/commons/LoadingData';
import songApi from 'app/api/methods/song';


const LIMIT_ITEMS = 7;

const ListSongView = ({ route, navigation }) => {

  let typeCallApi = null;
  let idType = null;
  
  if(route.params !== undefined){
    typeCallApi = route.params.type;
    idType = route.params.id;
  }
  
  const flatListRef = useRef(null);
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
    const response = await songApi(thePage, limit, typeCallApi, idType);
    await serverDataLoaded(response);
    await setLoadingData(false);
  }

  React.useEffect(() => {
    requestToServer(page);
  }, []);

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
    if (page > 1 && !refresh) {
      setPendingProcess(true);
      requestToServer(page);
    }
  }, [page]);

  useEffect(() => {
    if(clientData.length === 0 && refresh){
      setPendingProcess(true);
      requestToServer(1);
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

  const renderItem = ({ item }) => (
    <ListView data={item} navigation={navigation}  />
  );

  return (
    <>
    {loadingData && !refresh ? (
      <Spinner
        visible={loadingData}
        textContent={'Loading...'}
      />
    ) : (
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={flatListRef}
          refreshing={refresh}
          data={clientData}
          renderItem={renderItem}
          ListFooterComponent={loadMore ? (<LoadingData/>) : null}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0}
          onRefresh={() => onRefresh()}
        />
      </SafeAreaView>
    )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});


export default React.memo(ListSongView);