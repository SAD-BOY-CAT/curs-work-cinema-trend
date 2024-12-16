import { FC, memo, useState } from "react";
import Column from "../column/column";
import Text from "../text/text";
import Space from "../space/space";
import Row from "../row/row";
import { fonts } from "@/constants/font";
import { colors } from "@/constants/colors";
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import ArrowReviewIcon from "@/assets/svg/star-review";
import { styles } from "./appraisal-form.styles";
import SendIcon from "@/assets/svg/send-icon";
import { InputEvents } from "@/app/types";

export type AppraisalFormProps = {
    onSend: (content: string, rating: number) => Promise<void>
}
const AppraisalForm: FC<AppraisalFormProps> = ({ onSend }) => {
    const [amount, setAmount] = useState<number>(1);
    const onClick = (value: number) => {
        setAmount(value);
    }

    const [value, setValue] = useState<string>('');
    const onChangeInput = (e: InputEvents) => {
        setValue(e.nativeEvent.text);
    }

    const submit = async () => {
        await onSend(value, amount);
        setValue('');
    }

    return (
        <View style={{ display: "flex", width: "100%" }}>
            <Text font={fonts.h2}>Оцените фильм</Text>
            <Space variant="COLUMN" space={10} />
            <Row horizontal="flex-start" vertical="center">
                {Array.from({ length: 10 }).map((item, index) =>
                    <Row key={index}>
                        <Star
                            count={index + 1}
                            onClick={onClick}
                            color={amount >= index + 1 ? colors.dark.shadow : colors.dark.text}
                        />
                        <Space variant="ROW" space={5} />
                    </Row>
                )}
            </Row>
            <Space variant="COLUMN" space={20} />
            <Text font={fonts.h3}>Оставьте комментарий</Text>
            <Space variant="COLUMN" space={10} />
            <TextArea submit={submit} onChange={onChangeInput} value={value} />
        </View>
    )
}

type StarProps = {
    onClick: (value: number) => void;
    count: number;
    color: string;
}
const Star: FC<StarProps> = memo(({ onClick, count, color }) => {
    const click = () => {
        onClick(count);
    }
    return (
        <TouchableOpacity onPress={click}>
            <ArrowReviewIcon width={20} height={20} color={color} />
        </TouchableOpacity>
    )
})

type TextAreaProps = {
    value: string;
    onChange: (e: InputEvents) => void;
    submit: () => Promise<void>

} & TextInputProps;
const TextArea: FC<TextAreaProps> = ({ value, submit, onChange, ...rest }) => {
    return (
        <Row width="100%" vertical="center">
            <TextInput
                style={styles({ height: 30, width: value !== '' ? '85%' : '100%' }).textarea}
                placeholder="Ваш комментарий..."
                placeholderTextColor={colors.dark.gray}
                underlineColorAndroid="transparent"
                multiline={true}
                value={value}
                onChange={onChange}
                {...rest}
            />
            {value !== '' &&
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity onPress={submit}>
                        <SendIcon />
                    </TouchableOpacity>
                </View>
            }
        </Row>
    )
}

export default AppraisalForm;
