import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES, icons } from "../../constants";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";

const JobDetails = () => {
  const [refreshing, setRefreshing] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const tabs = ["About", "Qualifications", "Responsibilities"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data, isLoading, refetch, error } = useFetch("job-details", {
    job_id: params.id,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data?.data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout
            info={data?.data[0].job_description ?? "No data provided"}
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data?.data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerTitle: "",
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension={"60%"} />
          ),
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          ) : error ? (
            <View>
              <Text>Something went wrong</Text>
            </View>
          ) : data.length === 0 ? (
            <View>
              <Text>No Data</Text>
            </View>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data?.data[0]?.employer_logo}
                jobTitle={data?.data[0]?.job_title}
                companyName={data?.data[0]?.employer_name}
                location={data?.data[0]?.job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter url={'https://careers.google.com/jobs/results/'} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
