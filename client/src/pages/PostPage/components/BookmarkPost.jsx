import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import useRequireAuth from '../../../hooks/useRequireAuth';

const BookmarkPost = ({ bookmarks, isBookmarked, handleReaction }) => {
  const { isAuthed, handleAuth } = useRequireAuth(false);

  const action = isBookmarked ? 'removeBookmark' : 'bookmark';
  const effect = isBookmarked ? 'negative' : 'positive';

  const handleClick = () => {
    if (isAuthed) handleReaction(action, effect, likes, 'isBookmarked');
    else handleAuth();
  };

  return (
    <ReactionContainer>
      <BookmarkIcon isBookmarked={isBookmarked} onClick={handleClick}>
        {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
      </BookmarkIcon>
      <TotalReactions>{bookmarks && bookmarks.length}</TotalReactions>
    </ReactionContainer>
  );
};
export const ReactionContainer = tw.div`text-center flex items-center flex-col mb-md mob:(mb-sm flex items-center)`;
export const ReactionIcon = tw.div`p-2 cursor-pointer rounded-full`;
export const TotalReactions = tw.p`text-center text-dark-gray`;
const BookmarkIcon = styled(ReactionIcon)`
  ${({ isBookmarked }) =>
    isBookmarked
      ? tw`bg-bookmark-bg text-bookmark-text border-8 border-solid border-bookmark-bg`
      : tw`hover:(bg-bookmark-bg text-bookmark-text)`}
`;

export default BookmarkPost;
