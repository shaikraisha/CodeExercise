/**
 *This file contains filter and grid data components.
 *This file also contains filter logic and grid data sorting.
 */
import React from "react";
import "./App.scss";
import axios from "axios";
import { GenreDropdownData, YearDropdownData } from "./constants";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newSearchValue: {
        selectedGenre: [],
        selectedYear: [],
        selectedRadioType: "",
        searchValue: "",
      },
      movieRadio: false,
      booksRadio: false,
      genreClicked: false,
      yearClicked: false,
      data: [],
      filteredData: [],
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json"
      )
      .then(
        (results) => {
          this.setState(
            {
              data: results.data.media,
              filteredData: results.data.media,
            },
            () => {
              this.onSortEnd();
            }
          );
        },
        (error) => {
          this.setState({ error });
        }
      );
    window.addEventListener("mousedown", this.handleClickOutside, true);
  }
  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * @param {*} event
   * This event is to close the dropdowns in the filter section.
   * @returns nothing
   */
  handleClickOutside = (event) => {
    if (
      !Boolean(event.target.closest("#genre-id")) &&
      this.state.genreClicked
    ) {
      this.setState({
        genreClicked: false,
      });
    }

    if (!Boolean(event.target.closest("#year-id")) && this.state.yearClicked) {
      this.setState({
        yearClicked: false,
      });
    }
  };

  handleClearFilter = () => {
    this.setState({
      newSearchValue: {
        selectedGenre: [],
        selectedYear: [],
        selectedRadioType: null,
        searchValue: "",
      },
      booksRadio: false,
      movieRadio: false,
      filteredData: this.state.data,
    });
  };

  /**
   *Filter search Logic
   */
  getFilteredData = () => {
    const { data, newSearchValue } = this.state;
    let filteredData = "";

    /* Genre filter */
    if (newSearchValue.selectedGenre.length > 0) {
      newSearchValue.selectedGenre.forEach((selectedValue) => {
        const tempData = data.filter((item) =>
          item.genre.includes(selectedValue)
        );
        filteredData = [...filteredData, ...tempData];
      });
    }

    /* Year filter*/
    if (newSearchValue.selectedYear.length > 0) {
      newSearchValue.selectedYear.forEach((selectedValue) => {
        const tempData = data.filter((item) =>
          item.year.includes(selectedValue)
        );
        filteredData = [...filteredData, ...tempData];
      });
    }

    /* Radio filter */
    if (newSearchValue.selectedRadioType != null) {
      const Filterobject = filteredData == "" ? data : filteredData;

      let radioFilteredData = Filterobject.filter((item) =>
        item.type.includes(newSearchValue.selectedRadioType)
      );
      filteredData = radioFilteredData;
    }
    /* Search filter */
    if (newSearchValue.searchValue != "") {
      const Filterobject = filteredData == "" ? data : filteredData;
      filteredData = Filterobject.filter(({ title }) => {
        const str = title.toLowerCase();
        const temp = newSearchValue.searchValue;
        return str.includes(temp.toLowerCase());
      });
    }

    /* FilterData state set */
    filteredData = filteredData == "" ? data : filteredData;
    this.setState({ filteredData }, () => {
      this.removeDuplicates();
    });
  };

  /* Remove duplicate records from the filter data */
  removeDuplicates = () => {
    let { filteredData } = this.state;
    const strArr = filteredData.map((obj) => JSON.stringify(obj));
    filteredData = [...new Set(strArr)].map((u) => JSON.parse(u));
    this.setState({ filteredData }, () => {
      this.onSortEnd();
    });
  };

  /*Genre dropdown filter handler */
  genreDropdownChange = (e) => {
    const { newSearchValue } = this.state;
    if (e.target.checked) {
      Promise.resolve(
        this.setState({
          newSearchValue: {
            ...newSearchValue,
            selectedGenre: [...newSearchValue.selectedGenre, e.target.value],
          },
        })
      ).then(() => this.getFilteredData());
    } else {
      let tempArr = newSearchValue.selectedGenre;
      tempArr = tempArr.filter((item) => item != e.target.value);
      Promise.resolve(
        this.setState({
          newSearchValue: {
            ...newSearchValue,
            selectedGenre: tempArr,
          },
        })
      ).then(() => this.getFilteredData());
    }
  };

  /*Year dropdown filter handler */
  yearDropdownChange = (e) => {
    if (e.target.checked) {
      Promise.resolve(
        this.setState({
          newSearchValue: {
            ...this.state.newSearchValue,
            selectedYear: [
              ...this.state.newSearchValue.selectedYear,
              e.target.value,
            ],
          },
        })
      ).then(() => this.getFilteredData());
    } else {
      let tempArr = this.state.newSearchValue.selectedYear;
      tempArr = tempArr.filter((item) => item != e.target.value);
      Promise.resolve(
        this.setState({
          newSearchValue: {
            ...this.state.newSearchValue,
            selectedYear: tempArr,
          },
        })
      ).then(() => this.getFilteredData());
    }
  };

  /*Movie, Books Radio filter click */
  handleRadioChange = (e) => {
    if (e.target.value == "book") {
      this.setState({
        booksRadio: true,
        movieRadio: false,
      });
    } else {
      this.setState({
        movieRadio: true,
        booksRadio: false,
      });
    }
    Promise.resolve(
      this.setState({
        newSearchValue: {
          ...this.state.newSearchValue,
          selectedRadioType: e.target.value,
        },
      })
    ).then(() => this.getFilteredData());
  };

  /*Search filter handler */
  handleSearch = (e) => {
    const { newSearchValue } = this.state;

    /* Normal Search */
    this.setState(
      {
        newSearchValue: {
          ...newSearchValue,
          searchValue: e.target.value,
        },
      },
      () => this.getFilteredData()
    );
  };

  /* Dropdown checkbox display logic */
  showCheckboxes = (e) => {
    const { genreClicked, yearClicked } = this.state;
    if (e.target.id === "genreDropdown") {
      if (genreClicked) {
        this.setState({
          genreClicked: false,
        });
      } else {
        this.setState({
          genreClicked: true,
        });
      }
    } else {
      if (yearClicked) {
        this.setState({
          yearClicked: false,
        });
      } else {
        this.setState({
          yearClicked: true,
        });
      }
    }
  };

  /* Filter data sorting */
  onSortEnd = () => {
    const { filteredData } = this.state;
    filteredData.sort(function (a, b) {
      var DataA = a.title.toUpperCase();
      var DataB = b.title.toUpperCase();
      return DataA < DataB ? -1 : DataA > DataB ? 1 : 0;
    });
    this.setState({ filteredData });
  };

  /*Checkbox checked status */
  handleCheckboxStatus = (e) => {
    const value = e.target.value;
    const { newSearchValue } = this.state;
    newSearchValue.selectedGenre.forEach((selectedValue) => {});
    if (e.target.checked) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { newSearchValue, movieRadio, booksRadio } = this.state;
    return (
      <div className="main-page">
        <div className="filter-container">
          <div className="left-filter-item">
            <div>
              <div className="dropdown-container">
                <div className="dropdown-element">
                  <div class="dropdown" onClick={(e) => this.showCheckboxes(e)}>
                    <span id="genreDropdown" class="anchor">
                      {newSearchValue.selectedGenre.length > 0
                        ? newSearchValue.selectedGenre.length
                        : ""}{" "}
                      GENRES
                    </span>
                  </div>
                  {this.state.genreClicked ? (
                    <div
                      id="genre-id"
                      className="dropdown-display-list dropdown"
                      onChange={(e) => this.genreDropdownChange(e)}
                    >
                      <ul class="dropdown-checklist">
                        {GenreDropdownData.map((element) => {
                          return (
                            <li>
                              <input
                                value={element.toLowerCase()}
                                type="checkbox"
                                checked={newSearchValue.selectedGenre.includes(
                                  element.toLowerCase()
                                )}
                              />
                              {element}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="dropdown-element">
                  <div class="dropdown" onClick={(e) => this.showCheckboxes(e)}>
                    <span id="yearDropdown" class="anchor">
                      YEAR
                    </span>
                  </div>
                  {this.state.yearClicked ? (
                    <div
                      id="year-id"
                      className="dropdown-display-list dropdown"
                      onChange={(e) => this.yearDropdownChange(e)}
                    >
                      <ul class="dropdown-checklist">
                        {YearDropdownData.map((element) => {
                          return (
                            <li>
                              <input
                                value={element}
                                type="checkbox"
                                checked={newSearchValue.selectedYear.includes(
                                  element
                                )}
                                //checked={this.handleCheckboxStatus}
                              />
                              {element}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="radio-container">
                <form onChange={(e) => this.handleRadioChange(e)}>
                   {" "}
                  <input
                    type="radio"
                    id="movie"
                    name="dataType"
                    value="movie"
                    checked={movieRadio}
                  />
                    <label for="html">Movies</label> {" "}
                  <input
                    type="radio"
                    id="book"
                    name="dataType"
                    value="book"
                    checked={booksRadio}
                  />
                    <label for="css">Books</label>
                </form>
              </div>
            </div>
          </div>
          <div className="center-filter-item"></div>
          <div className="right-filter-item">
            <div>
              {/* <div className="dropdown">
              <FuzzySearch
                list={this.state.data}
                keys={["title"]}
                onSelect={(e) => this.handleSearch(e)}
                handleChange={(e) => {
                  this.handleSearchChange(e);
                }}
                verbose={true}
                className={"dropdown"}
              /> */}
              <input
                type="search"
                className="search-filter"
                name="searchValue"
                placeholder="Search..."
                value={newSearchValue.searchValue}
                onChange={(e) => this.handleSearch(e)}
              />
            </div>
            <div>
              <button className="clear-filter" onClick={this.handleClearFilter}>
                CLEAR FILTERS
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="grid-container">
          {this.state.filteredData.map((ele) => (
            <div className="grid-item">
              <div className="grid-tile">
                <img
                  src={ele.poster}
                  alt="image1"
                  width="95%"
                  height="100%"
                ></img>
                <div>
                  {ele.title} ({ele.year})
                </div>
                <div>Genres:{ele.genre.toString()}</div>
              </div>
            </div>
          ))}
          <div></div>
        </div>
      </div>
    );
  }
}
