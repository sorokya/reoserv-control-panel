import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from 'react-bootstrap';
import { formatDate } from '../../utils/formatDate';

const newsUpdates = [
  {
    id: 1,
    author: 'GameMaster01',
    subject: 'New Expansion Pack Release',
    body: "We are excited to announce the release of our latest expansion pack, 'Legends of the Forgotten Realm.' Explore new territories, face off against powerful enemies, and uncover ancient secrets. Available now!",
    date: '2024-06-27',
  },
  {
    id: 2,
    author: 'DevTeam',
    subject: 'Server Maintenance Schedule',
    body: 'We will be performing scheduled maintenance on our servers on July 1st from 2 AM to 6 AM UTC. During this time, the game will be unavailable. We apologize for any inconvenience and appreciate your understanding.',
    date: '2024-06-26',
  },
  {
    id: 3,
    author: 'CommunityManager',
    subject: 'Summer Festival Event',
    body: "Join us for the annual Summer Festival! Participate in special quests, earn unique rewards, and celebrate with the community from June 30th to July 14th. Don't miss out on the fun and festivities!",
    date: '2024-06-25',
  },
];

function News() {
  return newsUpdates.map((post) => (
    <Card key={post.id} className="mb-2">
      <CardHeader>
        <CardTitle>{post.subject}</CardTitle>
        <CardSubtitle>
          by {post.author} on {formatDate(post.date)}
        </CardSubtitle>
      </CardHeader>
      <CardBody>
        <p>{post.body}</p>
      </CardBody>
    </Card>
  ));
}

export default News;
