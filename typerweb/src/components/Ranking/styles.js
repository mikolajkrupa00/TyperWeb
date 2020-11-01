import styled from 'styled-components';
let x = props => props.isEven;
console.log(x);

export default {
    RankingContainer: styled.div`
    `,
    RankingRow: styled.div`
    background:${props => props.isEven};
    border-bottom: 1px solid #e4e4e4;
    height:60px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    `,
    RowData: styled.div`
    width:150px;
    `,
    RankingHeader: styled.div`
    font-weight:600;
    width:150px;
    `,
    Headers: styled.div`
    background:#efefef;
    height:40px;
    display:flex;
    align-items:center;
    flex-direction:row;
    `,
    PositionData: styled.div`
    width:100px;
    padding-left:20px;
    `,
    PositionHeader: styled.div`
    padding-left:20px;
    font-weight:600;
    width:100px;
    `,
    PointsHeader: styled.div`
    font-weight:600;
    width:100px;
    `,
    PointsData: styled.div`
    width:100px;
    `,
    UsernameHeader: styled.div`
    padding-left:20px;
    font-weight:600;
    width:250px;
    `,
    UsernameData: styled.div`
    padding-left:20px;
    width:250px;
    `,
}