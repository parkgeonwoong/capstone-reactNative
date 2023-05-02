/**
 * @컴포넌트 : 랭크 페이지
 * @관련된 컴포넌트 : Tabs
 */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BG_COLOR } from "../components/Colors";
import { BASE_URL } from "../api/api";

const Rank = () => {
  const [mappedName, setMappedName] = useState([]);
  const [mappedID, setMappedID] = useState([]);
  const [mappedTotal, setMappedTotal] = useState([]);

  useEffect(() => {
    const rank = async () => {
      try {
        const response = await fetch(`${BASE_URL}rank`);
        const data = await response.json();
        const mappingName = data.map((item) => item.username);
        const mappingID = data.map((item) => item.userid);
        const mappingTotal = data.map((item) => item.focustime);

        setMappedName(mappingName);
        setMappedID(mappingID);
        setMappedTotal(mappingTotal);
      } catch (error) {
        console.log(error);
      }
    };
    rank();
  }, []);

  return (
    <View style={styles.fullScreen}>
      <View style={styles.block}>
        <View style={styles.logoutBtn}>
          <View style={styles.context}>
            <Text style={[styles.text]}>🥇</Text>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {mappedName[0]} ({mappedID[0]})
            </Text>
          </View>
          <View style={styles.context}>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {mappedTotal[0]}
            </Text>
          </View>
        </View>
        <View style={styles.logoutBtn}>
          <View style={styles.context}>
            <Text style={[styles.text]}>🥈</Text>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {mappedName[1]} ({mappedID[1]})
            </Text>
          </View>
          <View style={styles.context}>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {mappedTotal[1]}
            </Text>
          </View>
        </View>
        <View style={styles.logoutBtn}>
          <View style={styles.context}>
            <Text style={[styles.text]}>🥉</Text>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {mappedName[2]} ({mappedID[2]})
            </Text>
          </View>
          <View style={styles.context}>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {mappedTotal[2]}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  block: {
    flex: 1,
    marginTop: 10,
  },
  logoutBtn: {
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 0.5,
    borderRadius: 10,
  },
  context: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    // paddingHorizontal: 20,
    paddingRight: 20,
    fontSize: 30,
    letterSpacing: 1,
    fontFamily: "BMHANNAPro",
    opacity: 0.8,
  },
});

export default Rank;
