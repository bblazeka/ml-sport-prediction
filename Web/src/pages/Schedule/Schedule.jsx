import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

import { getSchedule, setSortOrder } from "reducers/leagueActions";
import { Loader } from "components";
import { DateToServerFormat, getDatesArray } from "util/common";
import ScheduleTable from "./ScheduleTable";
import { selectSchedule } from "reducers/selectors";
import { useSchedule } from "services/hooks/schedule";
import { EScheduleSortOrder } from "reducers/leagueReducer";

const SchedulePageStyled = styled.div`
  overflow-x: auto;
`;

const TagContainerStyled = styled.div`
  display: flex;
  max-width: 400px;
  padding-left: 1vw;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DatesFilterStyled = styled.div`
  display: flex;
  max-width: 400px;
`;

const DatePickerStyled = styled(DatePicker)`
  margin: 0 1vw;
`;

const HomeGameTag = styled(Label)`
  background-color: turquoise !important;
`;

const AwayGameTag = styled(Label)`
  background-color: lightblue !important;
`;

const sortOptions = [{
  key: 1,
  text: "Sort by team",
  value: EScheduleSortOrder.team,
},
{
  key: 2,
  text: "Sort by score",
  value: EScheduleSortOrder.score
}];

export default function Schedule() {
  const { schedule, scheduleSortOrder } = useSelector(selectSchedule);
  const dispatch = useDispatch();
  const { start, end, setStartControl, setEndControl } = useSchedule();
  const getScheduleForTimePeriod = () => {
    const startDate = DateToServerFormat(start);
    const endDate = DateToServerFormat(end);
    dispatch(getSchedule(startDate, endDate));
  };

  useEffect(() => {
    getScheduleForTimePeriod();
  }, [start, end]);

  const dates = getDatesArray(start, end);
  if (!schedule) {
    return <Loader></Loader>;
  }

  const changeSort = (value) => 
  {
    dispatch(setSortOrder(value));
    getScheduleForTimePeriod();
  };
  return (
    <SchedulePageStyled>
      <FilterContainer>
        <DatesFilterStyled>
          <DatePickerStyled
            selected={start}
            onChange={(date) => setStartControl(date)}
            dateFormat="dd.MM.yyyy"
          />
          <DatePickerStyled
            selected={end}
            onChange={(date) => setEndControl(date)}
            dateFormat="dd.MM.yyyy"
          />
        </DatesFilterStyled>
        <Dropdown search selection defaultValue={scheduleSortOrder}
              onChange={(_event, data) => changeSort(data.value)} options={sortOptions} />
        <TagContainerStyled>
          <HomeGameTag tag>Home game</HomeGameTag>
          <AwayGameTag tag>Away game</AwayGameTag>
        </TagContainerStyled>
      </FilterContainer>
      <ScheduleTable dates={dates} schedule={schedule} />
    </SchedulePageStyled>
  );
}
