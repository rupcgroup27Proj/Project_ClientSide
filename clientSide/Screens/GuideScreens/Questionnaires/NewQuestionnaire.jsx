import React, { useEffect, useState } from 'react';
import { Button, Divider, IconButton, RadioButton, Text, TextInput, useTheme } from 'react-native-paper';
import { ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';


const NewQuestionnaire = ({ route }) => {
    const [title, setTitle] = useState('example questionnaire Title');
    const [description, setDescription] = useState('example questionnare Description');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([])
    const [questions, setQuestions] = useState([{
        "correctOption": 0,
        "options": [{ "value": "AAA", }, { "value": "BBB", }, { "value": "CCC", }, { "value": "DDD", }],
        "text": "Example question 1",
        "type": "closed",
    }, 
    {
        "correctOption": 0,
        "options": [{ "value": "AAA", }, { "value": "BBB", }, { "value": "CCC", }, { "value": "DDD", }],
        "text": "Example question 2",
        "type": "closed",
    }
    ]);
    const theme = useTheme();
    const { currentUser } = useUser();
    const { simulatorAPI } = useAPI();

    const getTags = async () => {
        await axios.get(`${simulatorAPI}/api/Tags/builtInTags`)
            .then((res) => { setTags(res.data) })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getTags();
    }, [])


    const addQuestion = (type) => {
        const question = { type };
        question.text = '';
        question.options = [{ value: '' }, { value: '' }, { value: '' }, { value: '' }];
        question.correctOption = 0;
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
        updatedQuestions[questionIndex].options.push({ value: "" });
        setQuestions(updatedQuestions);
    }

    const updateOption = (questionIndex, optionIndex, newText) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].value = newText;
        setQuestions(updatedQuestions);
    };

    const deleteOption = (questionIndex, optionIndex) => {
        const Questions = [...questions];
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
        if (description == '') return false;
        if (questions.length == 0) return false;

        const someClosedQuestionInvalid = questions.some(question => {
            const isTextEmpty = question.text == '';
            const isLowNumOfOptions = question.options.length < 2;
            const isSomeOptionEmpty = question.options.some(option => option == '');
            const noOptionHasBeenChosen = (question.correctOption == '');
            return question.type == 'closed' &&
                (isTextEmpty || isLowNumOfOptions || isSomeOptionEmpty || noOptionHasBeenChosen);
        });

        if (someClosedQuestionInvalid) return false;

        return true;
    }

    const postQuestionnaire = () => {
        if (validateQuestionnaire()) {
            const jsonQuestionnaire = {
                questionnaire: {
                    title: title,
                    description: description,
                    tags: selectedTags,
                    questions: questions
                }
            }
            console.log(jsonQuestionnaire)
            axios.post(`${simulatorAPI}/api/Questionnaires/groupId/${currentUser.groupId}`, jsonQuestionnaire)
                .then((res) => {
                    route.params.getAllQuestionnaires();
                    Alert.alert('Success', 'Questionnaire has been uploaded successfully.');
                    getTags();
                    setQuestions([]);
                    setTags([]);
                    setTitle('');
                    setDescription('')
                })
                .catch((err) => console.log(err))
        }
        else { Alert.alert('Error', 'All fields are required!'); }
    }


    return (
        <View>
            <ScrollView style={{ padding: 10, height: '88%' }}>
                <View style={{ flexDirection: 'row', flex: 10, marginBottom: 5 }}>
                    <TextInput
                        placeholder="Questionnaire Title"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        mode="flat"
                        style={{ flex: 9, alignSelf: 'center', backgroundColor: 'white' }}
                    />
                </View>

                <Divider bold={true} />

                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <TextInput
                        placeholder="Description"
                        multiline={true}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        mode="outlined"
                        style={{ flex: 9, alignSelf: 'center', backgroundColor: 'white' }}
                    />
                </View>

                <Divider bold={true} />

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                                    backgroundColor: selectedTags.includes(tag) ? theme.colors.primary : theme.colors.backdrop,
                                    borderRadius: 16,
                                    borderWidth: 0.1,
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    margin: 4,
                                }}
                            >
                                <Text>{tag.tagName}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <Divider bold={true} />

                <View
                    style={{ marginBottom: 16 }}>
                    {questions.map((question, questionIndex) => (
                        <View key={questionIndex} style={{ marginBottom: 16, marginTop: 5 }}>
                            <Text>Question {questionIndex + 1}:</Text>
                            <TextInput
                                placeholder={`Question text`}
                                value={question.text}
                                onChangeText={(newText) => updateQuestion(questionIndex, newText)}
                                style={{ marginBottom: 8, backgroundColor: theme.colors.accent }}
                            />
                            {questions[questionIndex].options.length !== 4 &&
                                <View style={{ flexDirection: "row", }}>
                                    <Button
                                        mode='elevated'
                                        onPress={() => addOption(questionIndex)}
                                        style={{ marginTop: 5 }}>
                                        Add option
                                    </Button>
                                </View>}
                            {questions[questionIndex].options.length !== 0 &&
                                <View>
                                    <Text style={{ marginLeft: "75%" }}>Correct:</Text>
                                </View>}
                            {question.options.map((option, optionIndex) => (
                                <View key={optionIndex} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                    <TextInput
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option.value}
                                        onChangeText={(newText) => updateOption(questionIndex, optionIndex, newText)}
                                        style={{ flex: 1, marginRight: 8, backgroundColor: theme.colors.accent }}
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
                            <Button
                                mode='elevated'
                                onPress={() => deleteQuestion(questionIndex)}
                                style={{ alignSelf: 'center', marginBottom: 10 }}>
                                Delete question
                            </Button>
                            <Divider bold={true} />
                        </View>
                    ))}
                </View>

                <Button onPress={() => addQuestion('closed')} mode={'contained-tonal'} buttonColor={theme.colors.backdrop} style={{ marginHorizontal: 15, marginBottom: 40, maginTop: 25 }}>
                    Add Question
                </Button>
            </ScrollView>

            <Divider bold={true} />

            <View >
                <Button title="Post"
                    mode='contained'
                    onPress={() => postQuestionnaire()}
                    icon={'upload'}
                    style={{ marginTop: 20, marginHorizontal: 10 }}>
                    Post
                </Button>
            </View>
        </View>
    );
};

export default NewQuestionnaire;
