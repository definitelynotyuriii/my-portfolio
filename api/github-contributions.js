export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const username = "definitelynotyuriii";

  if (!token) {
    return res.status(500).json({ error: "Missing GITHUB_TOKEN environment variable" });
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const ghResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });

    const json = await ghResponse.json();

    if (json.errors) {
      return res.status(500).json({ error: json.errors[0].message });
    }

    const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;
    const days = weeks.flatMap((w) => w.contributionDays);
    const maxCount = Math.max(...days.map((d) => d.contributionCount), 1);

    const levelFor = (count) => {
      if (count === 0) return 0;
      const ratio = count / maxCount;
      if (ratio <= 0.25) return 1;
      if (ratio <= 0.5) return 2;
      if (ratio <= 0.75) return 3;
      return 4;
    };

    const data = days.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: levelFor(d.contributionCount),
    }));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(200).json({
      total: json.data.user.contributionsCollection.contributionCalendar.totalContributions,
      data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}