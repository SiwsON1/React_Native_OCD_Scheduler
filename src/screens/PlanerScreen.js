import React, { useState, useRef} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import moment from "moment";
import { useMemo } from "react";
import Swiper from 'react-native-swiper';
import { useEffect } from "react";

const { width } = Dimensions.get("screen");

const PlannerScreen = () => {
    const [value, setValue] = useState(new Date());
    const [week, setWeek] = useState(0);
    const swiper = useRef();

    const weeks = useMemo(() => {
      const start = moment(start).add(week, "weeks").startOf("week");

      return [-1, 0, 1].map((adj) => {
        return Array.from({ length: 7 }).map((_, index) => {
          const date = moment(start).add(adj, "week").add(index, "day");
          return {
            weekday: date.format("ddd"),
            date: date.toDate(),
          };
        });
      });
    }, [week]);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Your Schedule</Text>
          </View>
          <View style={styles.picker}>
            <Swiper
              index={1}
              ref={swiper}
              showsPagination={false}
              loop={false}
              onIndexChanged={ind => {
                if (ind === 1) {
                  return;
                }
                setTimeout(() => {
                  const newIndex = ind - 1;
                  const newWeek = week + newIndex;
                  setWeek(newWeek);
                  setValue(moment(value).add(newIndex, 'week').toDate());
                  swiper.current.scrollTo(1, true);
                }, 50);
              }}
            >
              {weeks.map((dates, index) => (
                <View style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key= {index}>
                  {dates.map((item, dateIndex) => {
                    const isActive = value.toDateString() === item.date.toDateString();
                    return (
                      <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                        <View
                          style={[
                            styles.item,
                            isActive && {
                              backgroundColor: '#111',
                              borderColor: '#111',
                            },
                          ]}
                        >
                          <Text style={[styles.itemWeekday, isActive && { color: '#fff' }]}>{item.weekday}</Text>
                          <Text style={[styles.itemDate, isActive && { color: '#fff' }]}>{item.date.getDate()}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              ))}
            </Swiper>
          </View>
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  itemRow: {
    width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: -4,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "column",
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
});

export default PlannerScreen;
