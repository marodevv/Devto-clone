import { nanoid } from '@reduxjs/toolkit';
import { useContext } from 'react';
import { CgNotes } from 'react-icons/cg';
import { FaBirthdayCake, FaHashtag, FaRegComment } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import FollowUser from '../../common/FollowUser/FollowUser';
import LoadingController from '../../common/LoadingController/LoadingController';
import NotFound from '../../common/NotFound/NotFound';
import PostsList from '../../common/PostsList';
import RouteWrapper from '../../common/RouteWrapper';
import socketContext from '../../context/SocketContext';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import {
  useGetUserProfileQuery,
  useHandleUserFollowMutation,
} from '../../core/features/users/usersApiSlice';
import { formatDate } from '../../helpers/string';

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { username } = useParams();
  const { data: previewedUser } = useGetUserProfileQuery(username, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <RouteWrapper>
      {previewedUser ? (
        <Wrapper>
          <Card>
            <Avatar src={previewedUser.picture.url} />
            {previewedUser.username === currentUser.username ? (
              <EditButton onClick={() => navigate('/customize')}>Edit profile</EditButton>
            ) : (
              <FollowUser currentUser={currentUser} previewedUser={previewedUser} />
            )}
            <Name>{previewedUser.name}</Name>
            <Bio>{previewedUser.bio || 'No bio'}</Bio>
            <Other>
              <LocationWrapper>
                <HiLocationMarker />
                <Location>{previewedUser.location || 'Not determined'}</Location>
              </LocationWrapper>
              <CreatedAtWrapper>
                <FaBirthdayCake />
                <CreatedAt>Joined {formatDate(previewedUser.createdAt, false)}</CreatedAt>
              </CreatedAtWrapper>
            </Other>
            <Footer>
              <EducationWrapper>
                <Title>Education</Title>
                <Education>{previewedUser.education || 'Not determined'}</Education>
              </EducationWrapper>
              <WorkWrapper>
                <Title>Work</Title>
                <Work>{previewedUser.work || 'Not determined'}</Work>
              </WorkWrapper>
            </Footer>
          </Card>
          <MoreInfo>
            <LeftPortion>
              <BoxWrapper>
                <Heading>Available for</Heading>
                <BoxContent>{previewedUser.availableFor || 'Not determined'}</BoxContent>
              </BoxWrapper>
              <BoxWrapper>
                <Heading>Skills/Languages</Heading>
                <BoxContent>{previewedUser.skills || 'Not determined'}</BoxContent>
              </BoxWrapper>
              <Stats>
                <StatWrapper>
                  <CgNotes />
                  <StatContent>
                    <Count>{previewedUser.posts?.length || 0}</Count>
                    Posts published
                  </StatContent>
                </StatWrapper>
                <StatWrapper>
                  <FaRegComment />
                  <StatContent>
                    <Count>{previewedUser.comments?.length || 0}</Count>
                    Comments written
                  </StatContent>
                </StatWrapper>
                <StatWrapper>
                  <FaHashtag />
                  <StatContent>
                    <Count>{previewedUser.followedTags?.length || 0}</Count>
                    Tags followed
                  </StatContent>
                </StatWrapper>
              </Stats>
            </LeftPortion>
            <Posts>
              <PostsList
                posts={previewedUser.posts}
                toInvalidate={{
                  type: 'User',
                  id: previewedUser.id,
                  extra: { username },
                }}
              />
            </Posts>
          </MoreInfo>
        </Wrapper>
      ) : (
        <NotFound />
      )}
    </RouteWrapper>
  );
};

const LeftPortion = tw.div``;

const MoreInfo = tw.div`flex`;

const Posts = tw.div`w-full mt-sm ml-sm`;

const Wrapper = tw.div`max-w-[1200px]`;

const Card = styled.div`
  ${tw`bg-white flex flex-col items-center gap-sm relative rounded-md mob:(items-start) shadow`}
`;

const Avatar = tw.img`w-28 h-28 object-cover rounded-full mob:(ml-md)`;

const EditButton = tw.button`absolute top-md right-md text-white bg-blue rounded-md py-2 px-4`;

const Name = tw.h2` mob:(ml-md)`;

const Bio = tw.p`text-lg max-w-2xl text-center mob:text-left mob:(ml-md)`;

const Other = tw.div`flex gap-lg mob:(ml-md)`;

const LocationWrapper = tw.div`flex gap-2 text-gray`;

const Location = tw.div``;

const CreatedAtWrapper = tw.div`flex gap-2 text-gray`;

const CreatedAt = tw.div``;

const Footer = tw.div`w-full text-center border-t border-light-gray py-md flex items-center justify-evenly`;

const EducationWrapper = tw.div``;

const Education = tw.div``;

const WorkWrapper = tw.div``;

const Work = tw.div``;

const Title = tw.p`text-gray`;

const Stats = tw(Card)`w-80 items-start p-5 mt-sm shadow`;

const StatWrapper = tw.div`flex items-center gap-sm text-xl`;

const StatContent = tw.p``;

const Count = tw.span`mr-2`;

const BoxWrapper = tw(Stats)`shadow`;

const Heading = tw.h4`w-full pb-sm border-b border-light-gray`;

const BoxContent = tw.p`pb-sm whitespace-pre-line`;

export default Profile;
