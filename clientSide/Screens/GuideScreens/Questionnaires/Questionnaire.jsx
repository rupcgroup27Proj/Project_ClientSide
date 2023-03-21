
import React, { useEffect, useState } from 'react';
import { Button, Divider, IconButton, RadioButton, Text, TextInput, useTheme } from 'react-native-paper';
import { ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

//temporary user for tests
const currentUser = {
    Type: 'Teacher',
    GroupId: 2,
    UserId: 2,
    personalId: 222,
    Password: 222,
    FirstName: 'Teacher2',
    LastName: 'teacher2',
    Phone: 222,
    Email: 'teacher2@gmail.com',
    PictureUrl: null,
    ParentPhone: null,
    IsAdmin: 0,
    StartDate: '01/01/2020',
    EndDate: '02/02/2024'
}

//const postQuestionnaireAPI = `http://10.0.2.2:5283/api/Questionnaires/groupId/${currentUser.GroupId}`
const tagsAPI = 'http://10.0.2.2:5283/api/Tags/builtInTags'


const Questionnaire = () => {
    const [title, setTitle] = useState('q');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([])
    const [questions, setQuestions] = useState([{"type":"closed","text":"q1","options":[{"value":"qeee"},{"value":"qee"},{"value":"qe"},{"value":"q"}],"correctOption":"qee"},{"type":"open","text":"q2","options":[],"correctOption":null}]);//[]
    const theme = useTheme();
 
    const getTags = async () => {
        await axios.get(tagsAPI)
            .then((res) => { setTags(res.data) })
            .catch((err) => console.log(err))

    }

    useEffect(() => {
        getTags();
    }, [])



    const addQuestion = (type) => {
        const question = { type };
        if (type === 'closed') {
            question.text = '';
            question.options = ['', '', '', ''];
            question.correctOption = 0;
        } else {
            question.text = '';
            question.options = [];
            question.correctOption = null;
        }
        setQuestions([...questions, question]);
    };

    const updateQuestion = (index, newText) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = newText;
        setQuestions(updatedQuestions);
    };

    const deleteQuestion = (questionIndex) => {
        const updatedQuestions = questions.filter((option, index) => index != questionIndex);
        setQuestions(updatedQuestions);
    }


    const addOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push({value: ""});
        setQuestions(updatedQuestions);
    }

    const updateOption = (questionIndex, optionIndex, newText) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].value = newText;
        setQuestions(updatedQuestions);
    };

    const deleteOption = (questionIndex, optionIndex) => {
        const Questions = [...questions];
        //filter out the option, do not forget to reset the correct answer.
        Questions[questionIndex].options = Questions[questionIndex].options.filter((option, index) => index != optionIndex);
        Questions[questionIndex].correctOption = 0;
        setQuestions(Questions);
    };

    const updateCorrectOption = (questionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctOption = value;
        setQuestions(updatedQuestions);
    };

    const validateQuestionnaire = () => {
        if (title == '') return false;
        if (questions.length == 0) return false;

        const someOpenQuestionInvalid = questions.some(question => {
            return question.type == 'open' && question.text == ''
        })

        if (someOpenQuestionInvalid) return false

        const someClosedQuestionInvalid = questions.some(question => {
            const isTextEmpty = question.text == '';
            const isLowNumOfOptions = question.options.length < 2
            const isSomeOptionEmpty = question.options.some(option => option == '')
            const noOptionHasBeenChosen = (question.correctOption == '')
            return question.type == 'closed' &&
                (isTextEmpty || isLowNumOfOptions || isSomeOptionEmpty || noOptionHasBeenChosen)
        })

        if (someClosedQuestionInvalid) return false

        return true
    }

    const postQuestionnaire = () => {
        if (validateQuestionnaire()) {
            const jsonQuestionnaire = {
                questionnaire: {
                    title: title,
                    tags: selectedTags,
                    questions: questions
                }
            }

            axios.post(`http://10.0.2.2:5283/api/Questionnaires/groupId/${currentUser.GroupId}/json/${JSON.stringify(jsonQuestionnaire)}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            setQuestions([]);
            setTags([]);
            setTitle([]);
        }
        else {
            Alert.alert('Alert', 'All fields are required!', [
                { text: 'OK' },
            ]);
        }


    }





    return (
        <ScrollView>
            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', flex: 5 }}>

                    <TextInput
                        placeholder="Questionnaire Title"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        mode="outlined"
                        style={{ marginBottom: 16, flex: 4 }}
                    />
                    <Button title="Submit"
                        mode='contained'
                        onPress={() => postQuestionnaire()}>
                        Post
                    </Button>

                </View>

                <Divider bold={true} />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                    {tags.map((tag) => (
                        <TouchableOpacity
                            key={tag.tagId}
                            onPress={() =>
                                //Dual functinality. On clicking a tag, IF the id already exists in the "tags" useState, THAN filter out
                                //all tags that DO NOT match this id - it returns an array with all the selected tags but WITHOUT the
                                //tag that has been clicked. ELSE, store the tag for future use.
                                setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter((t) => t.tagId !== tag.tagId) : [...selectedTags, tag])
                            }
                            style={{
                                backgroundColor: selectedTags.includes(tag) ? theme.colors.tertiary : '#F2F2F2',//Conditional styling
                                borderRadius: 16,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                margin: 4,
                            }}
                        >
                            <Text>{tag.tagName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Divider bold={true} />

                <View style={{ marginTop: 16 }}>
                    {questions.map((question, questionIndex) => (
                        <View key={questionIndex} style={{ marginBottom: 16 }}>
                            <Text>Question {questionIndex + 1}:</Text>
                            <TextInput
                                placeholder={`Question text`}
                                value={question.text}
                                onChangeText={(newText) => updateQuestion(questionIndex, newText)}
                                style={{ marginBottom: 8 }}
                            />
                            <Button
                                mode='contained'
                                onPress={() => deleteQuestion(questionIndex)}>
                                Delete question
                            </Button>
                            {questions[questionIndex].options.length !== 4 && question.type === 'closed' &&
                                <View style={{ flexDirection: "row" }}>
                                    <Button
                                        mode='contained'
                                        onPress={() => addOption(questionIndex)}>
                                        Add option
                                    </Button>
                                </View>}
                            {questions[questionIndex].options.length !== 0 &&
                                <View>
                                    <Text style={{ marginLeft: "75%" }}>Correct:</Text>
                                </View>}
                            {question.type === 'closed' &&
                                question.options.map((option, optionIndex) => (
                                    <View key={optionIndex} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                        <TextInput
                                            placeholder={`Option ${optionIndex + 1}`}
                                            value={option.value} 
                                            onChangeText={(newText) => updateOption(questionIndex, optionIndex, newText)}
                                            style={{ flex: 1, marginRight: 8 }}
                                        />
                                        <RadioButton
                                            onPress={() => updateCorrectOption(questionIndex, option)}
                                            status={questions[questionIndex].correctOption === option && option !== "" ? 'checked' : 'unchecked'}
                                        />
                                        <IconButton
                                            onPress={() => deleteOption(questionIndex, optionIndex)}
                                            icon="delete"
                                            size={20}
                                        />
                                    </View>
                                ))}

                            <Divider bold={true} />

                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'center', padding: 5 }}>
                    <Button onPress={() => addQuestion('closed')} mode={'elevated'}>
                        Add Closed Question
                    </Button>
                    <Button onPress={() => addQuestion('open')} mode={'elevated'}>
                        Add Open Question
                    </Button>
                </View>

                <Divider bold={true} />

            </View>
        </ScrollView>
    );
};

export default Questionnaire;
