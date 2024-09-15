import fetch from "node-fetch";

const query = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      contributions {
        points
      }
      profile {
        reputation
        ranking
        realName
        aboutMe
        userAvatar
        location
        skillTags
        websites
        company
        school
        starRating
      }
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      badges {
        id
        displayName
        icon
        creationDate
      }
    }
    recentSubmissionList(username: $username, limit: 20) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
      runtime
      memory
      url
      __typename
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
        icon
      }
    }
  }
`;

const formatData = (data) => {
    let sendData = {
        username: data.matchedUser.username,
        totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count,
        totalSubmissions: data.matchedUser.submitStats.totalSubmissionNum[0].count,
        totalQuestions: data.allQuestionsCount[0].count,
        easySolved: data.matchedUser.submitStats.acSubmissionNum[1].count,
        totalEasy: data.allQuestionsCount[1].count,
        mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2].count,
        totalMedium: data.allQuestionsCount[2].count,
        hardSolved: data.matchedUser.submitStats.acSubmissionNum[3].count,
        totalHard: data.allQuestionsCount[3].count,
        ranking: data.matchedUser.profile.ranking,
        contributionPoints: data.matchedUser.contributions.points,
        reputation: data.matchedUser.profile.reputation,
        submissionCalendar: JSON.parse(data.matchedUser.submissionCalendar),
        recentSubmissions: data.recentSubmissionList,
        profile: {
            realName: data.matchedUser.profile.realName,
            aboutMe: data.matchedUser.profile.aboutMe,
            userAvatar: data.matchedUser.profile.userAvatar,
            location: data.matchedUser.profile.location,
            skillTags: data.matchedUser.profile.skillTags,
            websites: data.matchedUser.profile.websites,
            company: data.matchedUser.profile.company,
            school: data.matchedUser.profile.school,
            starRating: data.matchedUser.profile.starRating,
        },
        badges: data.matchedUser.badges,
        contestRanking: data.userContestRanking,
    };
    return sendData;
};

export const fetchUserProfile = (req, res) => {
    let user = req.params.username;
    fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Referer: "https://leetcode.com",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        body: JSON.stringify({ query: query, variables: { username: user } }),
    })
        .then((result) => result.json())
        .then((data) => {
            if (data.errors) {
                res.status(400).json({ error: "User not found or API error", details: data.errors });
            } else {
                res.json(formatData(data.data));
            }
        })
        .catch((err) => {
            console.error("Error", err);
            res.status(500).json({ error: "Internal server error", details: err.message });
        });
};
