const boardData = [
  {
    name: "Backlog",
    items: [
      {
        id: 1,
        title: "Create a new logo.",
        description: "",
        status: "Backlog",
        assignees: [
          {
            id: 1,
            avt: "https://randomuser.me/api/portraits/thumb/men/76.jpg",
          },
          {
            id: 2,
            avt: "https://randomuser.me/api/portraits/thumb/men/77.jpg",
          },
        ],
        comments: 2,
        attachments: 1,
      },
      {
        id: 2,
        title: "Create a new board",
        description: "Create a new board for the team",
        status: "Backlog",
        comments: 1,
        attachments: 0,
      },
    ],
  },
  {
    name: "In Progress",
    items: [
      {
        id: 3,
        title: "Implement login functionality",
        description: "Implement login functionality with authentication.",
        status: "In Progress",
        assignees: [
          {
            id: 3,
            avt: "https://randomuser.me/api/portraits/thumb/women/78.jpg",
          },
        ],
        comments: 3,
        attachments: 2,
      },
      {
        id: 4,
        title: "Design homepage",
        description: "Create a design for the homepage of the website.",
        status: "In Progress",
        assignees: [
          {
            id: 4,
            avt: "https://randomuser.me/api/portraits/thumb/women/79.jpg",
          },
        ],
        comments: 0,
        attachments: 1,
      },
    ],
  },
  {
    name: "In Review",
    items: [
      {
        id: 5,
        title: "Refactor backend code",
        description: "Refactor the backend code for better performance.",
        status: "In Review",
        assignees: [
          {
            id: 5,
            avt: "https://randomuser.me/api/portraits/thumb/men/80.jpg",
          },
        ],
        comments: 1,
        attachments: 3,
      },
    ],
  },
  {
    name: "Finished",
    items: [
      {
        id: 6,
        title: "Deploy to production",
        description: "Deploy the latest changes to the production server.",
        status: "Finished",
        assignees: [
          {
            id: 6,
            avt: "https://randomuser.me/api/portraits/thumb/men/81.jpg",
          },
        ],
        comments: 4,
        attachments: 0,
      },
    ],
  },
];

export default boardData;
