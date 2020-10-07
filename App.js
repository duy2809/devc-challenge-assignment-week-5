import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native";
import moment from "moment";
import { Card, Button, Icon } from "react-native-elements";

const filterForUniqueArticles = (arr) => {
  const cleaned = [];
  arr.forEach((itm) => {
    let unique = true;
    cleaned.forEach((itm2) => {
      const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
      if (isEqual) unique = false;
    });
    if (unique) cleaned.push(itm);
  });
  return cleaned;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);

  const getNews = async () => {
    if (lastPageReached) return;
    console.log("getNews");
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=cd15ae0f8d4d43c6a8c3e1d400c99ea8&page=${pageNumber}`
      );
      const jsonData = await response.json();
      const hasMoreArticles = jsonData.articles.length > 0;
      // console.log(jsonData.articles.length);
      // console.log(articles.length);
      if (hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(
          articles.concat(jsonData.articles)
        );
        setArticles(newArticleList);
        setPageNumber(pageNumber + 1);
      } else {
        setLastPageReached(true);
      }
    } catch (error) {
      setHasApiError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNews();
  }, [articles]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={100} loading={loading} color="black" />
      </View>
    );
  }

  if (hasErrored) {
    return (
      <View style={styles.container}>
        <Text style={styles.notiText}>Error =(</Text>
      </View>
    );
  }

  const renderArticleItem = ({ item }) => {
    return (
      <Card>
        <Card.Title>{item.title}</Card.Title>
        <Card.Image
          source={{ uri: item.urlToImage }}
          style={{ marginBottom: 10 }}
        />
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text style={{ marginBottom: 10 }}>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>{moment(item.publishedAt).fromNow()}</Text>
        </View>
        <Button
          icon={<Icon />}
          title="Read more"
          backgroundColor="#03A9F4"
          onPress={() => onPress(item.url)}
        />
      </Card>
    );
  };

  const onPress = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Articles Count:</Text>
        <Text style={styles.info}>{articles.length}</Text>
      </View>
      <FlatList
        onEndReached={getNews}
        onEndReachedThreshold={1}
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.title}
        ListFooterComponent={
          lastPageReached ? (
            <Text style={styles.notiText}>No more articles</Text>
          ) : (
            <ActivityIndicator size="large" loading={loading} color="black" />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
  },

  label: {
    fontSize: 16,
    color: "black",
    marginRight: 10,
    fontWeight: "bold",
  },

  info: {
    fontSize: 16,
    color: "grey",
    marginBottom: 10,
  },

  notiText: {
    fontSize: 20,
    alignSelf: "center",
    padding: 20,
  },
});
